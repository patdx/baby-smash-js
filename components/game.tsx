import { Text } from 'drei';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import { useDrag } from 'react-use-gesture';
import { Vector3 } from 'three';
// import { Physics, useBox } from 'use-cannon';

declare const __THREE_DEVTOOLS__: any;

type V3 = [number, number, number];

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

const Letter: FC<{ initialX: number }> = ({ children, initialX }) => {
  const [position, setPosition] = useState(new Vector3(initialX, 0, 0));

  // const text = useRef<Text>();

  const bind = useDrag(
    ({ offset: [x, y] }) => {
      setPosition(new Vector3(x, -y, 0));
    },
    {
      eventOptions: {
        pointer: true,
      },
    }
  );

  // const [ref, api] = useBox(() => ({ mass: 1 }));

  return (
    // <Physics>
    /* <mesh ref={ref} {...bind()}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color={'hotpink'} />
      </mesh> */
    <Text
      // ref={ref}
      fontSize={200}
      color="black"
      position={position}
      {...bind()}
    >
      {children}
    </Text>
    // </Physics>
  );
};
export const Game: FC = () => {
  const camera = useRef();
  (window as any).camera = camera;

  // default camera has same width as canvas

  return (
    <Canvas
      style={{ width: '100vw', height: '100vh' }}
      orthographic
      concurrent
      camera={{
        position: [0, 0, 100],
      }}
    >
      <DevTools></DevTools>
      <Letter initialX={-50}>A</Letter>
      <Letter initialX={50}>B</Letter>
    </Canvas>
  );
};
