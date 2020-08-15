import Head from 'next/head';
import React, { FC } from 'react';
import styles from "./layout.module.css"

export const Layout: FC = ({ children }) => (
  <>
    <Head>
      <title>Baby Smash JS</title>
    </Head>
    {/* todo */}
    <div className={styles.headerIos}></div>
    {children}
  </>
);
