import * as CANNON from 'cannon-es';
import { Text } from 'drei';
import React, { FC, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { useDrag } from 'react-use-gesture';
import { OrthographicCamera, Vector3 } from 'three';
import { LETTERS } from '../utils/letter-range';
import { PhysicsProvider, useCannon } from './cannon';
import { DevTools } from './dev-tools';
import { sample } from 'lodash';

// may help with safari? https://github.com/react-spring/react-three-fiber/issues/190
// import 'pepjs';
// touch-action="none"
// NOTE: if I just set the css style it seems to work alright

const COLORS = ['red', 'blue', 'yellow', 'pink'];

const getColor = () => sample(COLORS);

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
    {},
    (body) => {
      const material = new CANNON.Material();
      material.friction = 10;
      body.material = material;
      body.addShape(new CANNON.Plane());
      body.position.copy(
        new CANNON.Vec3(
          ...new Vector3(...realPosition).multiplyScalar(factor).toArray()
        )
      );
      body.quaternion.copy(
        (new CANNON.Quaternion().setFromEuler as any)(...rotation)
      );
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

const Letter: FC<{ initialX: number; initialY: number; mass?: number }> = ({
  children,
  initialX,
  initialY,
  mass = 1,
}) => {
  const [dragging, setDragging] = useState(false);

  const [color] = useState(() => getColor());

  const [ref, api] = useCannon(
    {
      mass,
    },
    (body) => {
      const material = new CANNON.Material();
      material.friction = 0.3;
      body.material = material;
      body.addShape(new CANNON.Sphere(70));
      body.position.set(initialX, initialY, 0);
      body.velocity.set(0, 0, 0);
    },
    []
  );

  const bind = useDrag(
    (props) => {
      const {
        movement: [mx, my],
        velocities: [vx, vy],
      } = props;

      // TODO: would like to add multi touch support
      // seems that event is created by react-three-fiber

      console.log(props.pointerId, props.event, props.touches);

      if (props.first) {
        setDragging(true);
        api.velocity.set(0, 0, 0);
        api.mass = 0;
      }

      api.position.set(mx, -my, 0);

      if (props.last) {
        setDragging(false);
        api.velocity.set(vx * 1000, -vy * 1000, 0);
        api.mass = mass;
      }
    },
    {
      eventOptions: {
        pointer: true,
      },
      initial: () => [api.position.x, -api.position.y],
    }
  );

  useFrame(() => {
    // reset any out of plane
    api.position.z = 0;

    // only allow rotation in z axis
    // const temp = new CANNON.Vec3();
    // api.quaternion.toEuler(temp);
    // temp.x = 0;
    // temp.y = 0;
    // api.quaternion.setFromEuler(temp.x, temp.y, temp.z);

    // api.angularVelocity.x = 0;
    // api.angularVelocity.y = 0;

    if (dragging) {
      api.velocity.set(0, 0, 0);
    }
  });

  return (
    <Text ref={ref} fontSize={200} color={color} {...bind()}>
      {children}
    </Text>
  );
};

export const TouchBackground: FC<{
  onClick?: (x: number, y: number) => any;
}> = (props) => {
  return (
    <mesh
      onClick={(event) =>
        props.onClick?.(event.unprojectedPoint.x, event.unprojectedPoint.y)
      }
      position={[0, 0, -100]}
    >
      <boxBufferGeometry attach="geometry" args={[1000, 1000, 1]} />
      {/* <meshStandardMaterial attach="material" color='white' /> */}
    </mesh>
  );
};

export const Game: FC = () => {
  const camera = useRef();
  (window as any).camera = camera;

  // default camera has same width as canvas

  const [letters, setLetters] = useState<
    {
      index: number;
      x: number;
      y: number;
    }[]
  >([
    {
      index: 0,
      x: 0,
      y: 0,
    },
  ]);

  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        touchAction: 'none',
      }}
      orthographic
      concurrent
      camera={{
        position: [0, 0, 100],
      }}
      pixelRatio={window.devicePixelRatio || 2}
    >
      <PhysicsProvider>
        <DevTools></DevTools>
        <Plane position={'bottom'}></Plane>
        <Plane position={'left'}></Plane>
        <Plane position={'right'}></Plane>
        <Plane position={'top'}></Plane>
        <TouchBackground
          onClick={(x, y) =>
            setLetters((letters) => [
              ...letters,
              {
                index: letters.length,
                x,
                y,
              },
            ])
          }
        ></TouchBackground>
        {letters.map(({ index, x, y }) => (
          <Letter key={index} initialX={x} initialY={y}>
            {LETTERS[index]}
          </Letter>
        ))}
      </PhysicsProvider>
    </Canvas>
  );
};
