import { Text } from 'drei';
import React, { FC, useEffect, useMemo, useRef } from 'react';
import { Canvas, useThree, useFrame } from 'react-three-fiber';
import { useDrag } from 'react-use-gesture';
import { OrthographicCamera, Vector3 } from 'three';
import { Physics, useBox, usePlane } from 'use-cannon';
import 'pepjs'; // may help with safari? https://github.com/react-spring/react-three-fiber/issues/190
import { DevTools } from './dev-tools';
import { PhysicsProvider, useCannon } from './cannon';
import * as CANNON from 'cannon-es';

const Position = ['bottom', 'top', 'left', 'right'] as const;
type Position = typeof Position[number];

// NOTE: due to issues with use-cannon, try to replace with our own physics
// https://github.com/react-spring/use-cannon/issues/63
// https://github.com/react-spring/react-three-fiber/blob/master/examples/src/demos/Physics.js
// TODO: try adding the cannon wireframe
// https://github.com/codynova/action-game/tree/master/src/debug

const rotations: Record<
  Position,
  {
    rotation: number[];
    position: number[];
  }
> = {
  bottom: {
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -1, 0],
  },
  top: { rotation: [Math.PI / 2, 0, 0], position: [0, 1, 0] },
  left: { rotation: [0, Math.PI / 2, 0], position: [-1, 0, 0] },
  right: { rotation: [0, -Math.PI / 2, 0], position: [1, 0, 0] },
};

const Plane: FC<{ position: Position }> = (props) => {
  const { rotation, position: realPosition } = rotations[props.position];

  const three = useThree();

  // use the number from the camera
  const factor = Math.abs((three.camera as OrthographicCamera)[props.position]);

  const [ref] = useCannon(
    {
      // position: new CANNON.Vec3(
      //   ...new Vector3(...realPosition).multiplyScalar(factor).toArray()
      // ),
      // quaternion: (new CANNON.Quaternion().setFromEuler as any)(...rotation),
    },
    (body) => {
      body.addShape(new CANNON.Plane());
      body.position.copy(new CANNON.Vec3(
        ...new Vector3(...realPosition).multiplyScalar(factor).toArray()
      ))
      body.quaternion.copy((new CANNON.Quaternion().setFromEuler as any)(...rotation))
      // body.position.set(...position);
    },
    []
  );

  return (
    <mesh ref={ref}>
      {['top', 'bottom'].includes(props.position) ? (
        <boxBufferGeometry attach="geometry" args={[1000, 1, 1]} />
      ) : (
        <boxBufferGeometry attach="geometry" args={[1, 1000, 1]} />
      )}

      <meshStandardMaterial attach="material" color={'hotpink'} />
    </mesh>
  );
};

const Letter: FC<{ initialX: number }> = ({ children, initialX }) => {
  const mutable = useMemo<{
    position?: number[];
    initial?: number[];
  }>(() => ({}), []);

  const [ref, api] = useCannon(
    {
      mass: 1,
    },
    (body) => {
      body.addShape(new CANNON.Box(new CANNON.Vec3(50, 50, 50)));
      body.position.set(initialX, 0, 0);
      body.velocity.set(-initialX, 0, 0);
    },
    []
  );

  const bind = useDrag(
    (props) => {
      const {
        movement: [dx, dy],
        velocities: [vx, vy],
      } = props;

      if (props.first) {
        mutable.initial = api.position.toArray();
        api.velocity.set(0, 0, 0);
      }

      api.position.set(
        (mutable.initial?.[0] ?? 0) + dx,
        (mutable.initial?.[1] ?? 0) - dy,
        0
      );

      if (props.last) {
        api.velocity.set(vx * 1000, -vy * 1000, 0);
      }
    },
    {
      eventOptions: {
        pointer: true,
      },
    }
  );

  return (
    <Text ref={ref} fontSize={200} color="pink" {...bind()}>
      {children}
    </Text>
  );
};
export const Game: FC = () => {
  const camera = useRef();
  (window as any).camera = camera;

  // default camera has same width as canvas

  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      orthographic
      concurrent
      camera={{
        position: [0, 0, 100],
      }}
      pixelRatio={window.devicePixelRatio || 2}
      touch-action="none"
    >
      <PhysicsProvider>
        <DevTools></DevTools>
        <Plane position={'bottom'}></Plane>
        <Plane position={'left'}></Plane>
        <Plane position={'right'}></Plane>
        <Plane position={'top'}></Plane>
        <Letter initialX={-200}>A</Letter>
        <Letter initialX={200}>B</Letter>
      </PhysicsProvider>
    </Canvas>
  );
};
