import 'normalize.css';
import { DefaultSeo } from 'next-seo';
import { FC } from 'react';
import Head from 'next/head';
import { IosMetaTags } from '../components/ios-meta-tags';

const MyApp: FC<{
  Component: FC<any>;
  pageProps: any;
}> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
        <link rel="manifest" href="/assets/manifest.json" />
        <link
          rel="mask-icon"
          href="/assets/safari-pinned-tab.svg"
          color="#000000"
        />
        <meta name="apple-mobile-web-app-title" content="Baby Smash JS" />
        <meta name="application-name" content="Baby Smash JS" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta name="theme-color" content="#ffffff"></meta>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <IosMetaTags></IosMetaTags>
      </Head>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'http://baby-smash-js.vercel.app',
          title: 'Baby Smash JS',
          images: [
            {
              url: 'https://baby-smash-js.vercel.app/assets/open-graph.png',
              width: 1200,
              height: 630,
              alt: 'Baby Smash JS',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
