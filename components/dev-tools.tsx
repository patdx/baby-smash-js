import { FC, useEffect } from 'react';
import { useThree } from 'react-three-fiber';

declare const __THREE_DEVTOOLS__: any;

export const DevTools: FC = () => {
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
