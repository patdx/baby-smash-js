// import { useWindowSize } from '@react-hook/window-size';
import { useSpring } from 'react-spring';
import { animated } from 'react-spring/three';
import { Text } from 'drei';
import React, { FC, useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { useDrag } from 'react-use-gesture';

const AnimatedText = animated(Text);

type V3 = [number, number, number];

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
      position={position as any}
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
      <Letter initialX={-50}>A</Letter>
      <Letter initialX={50}>B</Letter>
    </Canvas>
  );
};
