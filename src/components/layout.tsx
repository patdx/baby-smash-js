import Head from 'next/head';
import React, { FC } from 'react';

export const Layout: FC = ({ children }) => (
  <>
    <Head>
      <title>Baby Smash JS</title>
    </Head>
    {children}
  </>
);
