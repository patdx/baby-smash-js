import * as CANNON from 'cannon-es';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  FC,
} from 'react';
import { useFrame } from 'react-three-fiber';
import { Mesh, Vector3, Quaternion } from 'three';

const WorldContext = createContext<CANNON.World>(undefined as any);

export const PhysicsProvider: FC = ({ children }) => {
  const [world] = useState(() => new CANNON.World());

  useEffect(() => {
    world.broadphase = new CANNON.NaiveBroadphase();
    (world.solver as any).iterations = 10;
    world.gravity.set(0, -100, 0);
  }, [world]);

  // Run world stepper every frame
  useFrame(() => world.step(1 / 60));

  return (
    <WorldContext.Provider value={world}>{children}</WorldContext.Provider>
  );
};

export const useCannon = (
  { ...props }: CANNON.BodyOptions,
  fn: (body: CANNON.Body) => any,
  deps = []
) => {
  const ref = useRef<Mesh>();
  const world = useContext(WorldContext);
  const [body] = useState(() => {
    console.log(props);
    return new CANNON.Body(props);
  });

  useEffect(() => {
    // Call function so the user can add shapes, positions, etc. to the body
    fn(body);
    world.addBody(body);
    return () => world.removeBody(body);
  }, deps);

  useFrame(() => {
    if (ref.current) {
      // Transport cannon physics into the referenced threejs object
      const { position, quaternion } = body;
      const { x: px, y: py, z: pz } = position;
      const { x: qx, y: qy, z: qz, w: qw } = quaternion;
      ref.current.position.copy(new Vector3(px, py, pz));
      ref.current.quaternion.copy(new Quaternion(qx, qy, qz, qw));
    }
  });

  return [ref, body] as const;
};
