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
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#358ca5" />
      <meta name="apple-mobile-web-app-title" content="Baby Smash JS" />
      <meta name="application-name" content="Baby Smash JS" />
      <meta name="msapplication-TileColor" content="#00aba9" />
      <meta name="theme-color" content="#ffffff"></meta>
    </Head>
    {children}
  </>
);
