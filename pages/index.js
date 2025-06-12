import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default function Home() {
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    setShowImages(true);
  }, []);

  return (
    <>
      <Head>
        <title>Rollbar Resource Test</title>
        <link
          rel="stylesheet"
          href="/assets/missing-style.css"
          onError={() => {
            if (typeof window !== "undefined") {
              logResourceLoadError({ href: "/assets/missing-style.css" });
            }
          }}
        />
        <link
          rel="stylesheet"
          href={`/assets/lpStyle11.css`}
          onerror="logResourceLoadError(this)"
        />
        <link
          rel="icon"
          href="/assets/missing-favicon.ico"
          onError={() => {
            if (typeof window !== "undefined") {
              logResourceLoadError({ href: "/assets/missing-favicon.ico" });
            }
          }}
        />
      </Head>

      <script src="/assets/rollbar.js"></script>
      <script src="/assets/logger.js"></script>

      <main style={{ padding: 40 }}>
        <h1>Rollbar SSG Test</h1>
        {showImages && (
          <>
            <img
              src="/assets/missing-image.png"
              alt="Broken"
              width={200}
              onError={(e) => logResourceLoadError(e.currentTarget)}
            />
            <img
              src="/assets/missing-image.png"
              alt="Broken"
              width={200}
              onError={() => logResourceLoadError({ src: "/assets/missing-image.png" })}
            />
          </>
        )}
        <Script
          src="/assets/missing-before.js"
          strategy="beforeInteractive"
          onError={(e) => logResourceLoadError(e.currentTarget)}
        />
        <Script
          src="/assets/missing-after.js"
          strategy="afterInteractive"
          onError={(e) => logResourceLoadError(e.currentTarget)}
        />
        <Script
          src="/assets/missing-lazy.js"
          strategy="lazyOnload"
          onError={(e) => logResourceLoadError(e.currentTarget)}
        />
        <Script
          src="/js/config.js"
          strategy="afterInteractive"
          onError={() => logResourceLoadError({ src: "/js/config.js" })}
        />
      </main>
    </>
  );
}