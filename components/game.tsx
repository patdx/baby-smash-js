import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/three';
import { Text } from 'drei';
import React, { FC, useRef, useEffect } from 'react';
import { Canvas, useThree } from 'react-three-fiber';
import { useDrag } from 'react-use-gesture';

const AnimatedText = animated(Text);

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
  const [{ position }, set] = useSpring(() => ({
    position: ([initialX, 0, 0] as V3) as any,
  }));

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(
    ({ offset: [x, y] }) => {
      set({
        position: [initialX + x, -y, 0] as any,
      });
    },
    {
      eventOptions: {
        pointer: true,
      },
    }
  );

  return (
    <AnimatedText
      fontSize={200}
      color="black"
      position={position}
      // position={position as any}
      {...bind()}
    >
      {children}
    </AnimatedText>
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
