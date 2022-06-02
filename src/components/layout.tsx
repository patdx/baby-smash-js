import classnames from 'classnames';
import Head from 'next/head';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import styles from './layout.module.css';

const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<{
    width?: number;
    height?: number;
  }>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });


      // if iOS use of regular app touches the top of the screen
      // in landscape, it can pop up the nav, shrinking the page,
      // without scrolling. so we reset the scroll just in case
      document.scrollingElement && (document.scrollingElement.scrollTop = 0);
    }

    // Add event listener
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    // sometimes if the safari header is collapsed after orientation change
    // it is not reported correctly right after the resize/orientation events
    // TODO: sometimes it seems that even after changing landscape to portrait
    // the window.innerHeight value is just invalid
    // const timer = setInterval(handleResize, 1000);
    // NOTE#2: it seems like if we try to deliberately change the div height in reaction
    // to the window.innerHeight then safari just reverts the minimal UI so the
    // height of our UI has to change again.
    // so this resize detection, at least on iOS, is only useful for

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      // clearInterval(timer);
    };
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
};

// const forceIosStandalone = true;
const forceIosStandalone = false;

const getIosStandaloneImmediate = () => {
  // handle ssr
  if (typeof navigator === 'undefined') {
    return false;
  }

  if (forceIosStandalone) {
    return true;
  }

  return (navigator as any).standalone ? true : false;
};

/**
 * use ios standalone value if it is available
 * (supports SSR)
 */
export const useIosStandalone = () => {
  const [isStandalone, setStandalone] = useState(false);

  useEffect(() => setStandalone(getIosStandaloneImmediate()), []);

  return isStandalone;
};

const Header: FC = () => {
  const isStandalone = useIosStandalone();

  return (
    <div
      className={classnames(
        isStandalone ? styles.headerIos : undefined,
        styles.header
      )}
    ></div>
  );
};

export const Layout: FC<{children?: ReactNode}> = ({ children }) => {
  const isStandalone = useIosStandalone();

  const { height: windowHeight } = useWindowSize();

  const manuallyAssignedHeight = (() => {
    if (isStandalone) {
      // in standalone mode the height should not change
      // due to nav expanding/shrinking so we can ignore
      return;
    }

    if (!windowHeight) {
      // if null or 0, we do not want to apply
      return;
    }

    return windowHeight;
  })();

  return (
    <>
      <Head>
        <title>Baby Smash JS</title>
      </Head>
      <div
        className={classnames(
          styles.container,
          isStandalone
            ? styles.containerIosStandaloneSizing
            : styles.containerRegularSizing
        )}
        style={{
          height: manuallyAssignedHeight,
        }}
      >
        <Header></Header>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};
