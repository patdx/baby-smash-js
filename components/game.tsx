import { Text } from 'drei';
import React, { FC, useEffect, useMemo, useRef } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import { useDrag } from 'react-use-gesture';
import { OrthographicCamera, Vector3 } from 'three';
import { Physics, useBox, usePlane } from 'use-cannon';

declare const __THREE_DEVTOOLS__: any;

// type V3 = [number, number, number];

const DevTools: FC = () => {
  const { scene, gl } = useThree();

  useEffect(() => {
    if (typeof __THREE_DEVTOOLS__ !== 'undefined') {
      __THREE_DEVTOOLS__.dispatchEvent(
        new CustomEvent('observe', { detail: scene })
      );
      __THREE_DEVTOOLS__.dispatchEvent(
        new CustomEvent('observe', { detail: gl })
      );
    }
  });
  return null;
};

const Position = ['bottom', 'top', 'left', 'right'] as const;
type Position = typeof Position[number];

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

  console.log(three);
  const [ref] = usePlane(() => ({
    rotation,
    position: new Vector3(...realPosition).multiplyScalar(factor).toArray(),
  }));

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

  const [ref, api] = useBox(() => ({
    mass: 1,
    position: [initialX, 0, 0],
    args: [100, 100, 100],
  }));

  useEffect(() => {
    api.position.subscribe((value) => (mutable.position = value));
  });

  // const [position, setPosition] = useState(new Vector3(initialX, 0, 0));

  // const text = useRef<Text>();

  const bind = useDrag(
    (props) => {
      const {
        movement: [dx, dy],
        velocities: [vx, vy],
      } = props;

      if (props.first) {
        mutable.initial = mutable.position;
        api.velocity.set(0, 0, 0);
      }

      // api.position.set(x, -y, 0);
      api.position.set(mutable.initial![0] + dx, mutable.initial![1] - dy, 0);

      if (props.last) {
        api.velocity.set(vx * 1000, -vy * 1000, 0);
      }

      // setPosition(new Vector3(x, -y, 0));
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

  return (
    <mesh {...bind()} ref={ref}>
      <boxBufferGeometry attach="geometry" args={[100, 100, 100]} />
      <meshStandardMaterial attach="material" color={'hotpink'} />
    </mesh>
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
    >
      <Physics gravity={[0, 0, 0]}>
        <DevTools></DevTools>
        <Plane position={'bottom'}></Plane>
        <Plane position={'left'}></Plane>
        <Plane position={'right'}></Plane>
        <Plane position={'top'}></Plane>
        <Letter initialX={-100}>A</Letter>
        <Letter initialX={100}>B</Letter>
      </Physics>
    </Canvas>
  );
};
