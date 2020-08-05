// import { useWindowSize } from '@react-hook/window-size';
import { useSpring, animated } from 'react-spring';
import 'react-spring/three';
import { Text } from 'drei';
import React, { FC, useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { useDrag } from 'react-use-gesture';

const AnimatedText = animated(Text);

type V3 = [number, number, number];

const Letter: FC<{ initialX: number }> = ({ children, initialX }) => {
  // const three = useThree();
  // console.log(three);

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
    <AnimatedText fontSize={200} color="black" position={position as any} {...bind()}>
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
        // left: -100,
        // right: 100,
        // top: 100,
        // bottom: -100,
        // aspect: width / height,
      }}
    >
      {/* <orthographicCamera
        attach="camera"
        position={[100, 0, 100]}
        left={-100}
        right={100}
        bottom={-100}
        top={100}
        ref={camera}
      ></orthographicCamera> */}

      <Letter initialX={-50}>A</Letter>
      <Letter initialX={50}>B</Letter>

      {/* <Text fontSize={100} color="black" position={}>
        A
      </Text>
      <Text fontSize={100} color="black" position={[10, 0, 0]}>
        B
      </Text>
      <Ball /> */}
    </Canvas>
  );
};

// const isPressed = useRef(false);

// const onPointerDown = useCallback((e) => {
//   isPressed.current = true;
//   e.target.setPointerCapture(e.pointerId);
// }, []);

// const { spring } = useSpring({
//   from: {
//     spring: [initialX, 0, 0] as [number, number, number],
//   },
//   to: {
//     spring: position,
//   },
// });

// const onPointerUp = useCallback((e) => {
//   isPressed.current = false;
//   e.target.releasePointerCapture(e.pointerId);
// }, []);

// const onPointerMove = useCallback((e) => {
//   if (isPressed.current) {
//     setPosition(e.unprojectedPoint.clone().setZ(0));
//   }
// }, []);
