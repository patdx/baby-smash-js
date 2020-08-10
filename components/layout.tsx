import Head from 'next/head';
import React, { FC } from 'react';

export const Layout: FC<{
  title?: string;
}> = ({ children, title = 'Baby Smash JS' }) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
    </Head>
    {children}
  </>
);
