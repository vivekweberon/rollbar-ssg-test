import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default function Home() {
  // const [showImages, setShowImages] = useState(false);

  // useEffect(() => {
  //   setShowImages(true);
  // }, []);

  function logResourceLoadError(event) {
    console.log("logResourceLoadError called with event - server", event);
    let src = event?.currentTarget?.src || event?.target?.src || event?.srcElement?.src || "unknown";
    let err = "Error loading: '" + src + "'";
    Rollbar.error(err);
    return false;
  }

  function handleImageError(e) {
    e.target.onerror = null;
    e.target.src = "https://example.com/fallback.jpg";
  }

  return (
    <>
      <Head>
        <title>Rollbar Resource Test</title>
        {/* <link
          rel="stylesheet"
          href="/assets/missing-style.css"
          onError={() => {
              logResourceLoadError({ href: "/assets/missing-style.css" });
          }}
        /> */}
        <link
          rel="stylesheet"
          href={`/assets/lpStyle11.css`}
          onError={logResourceLoadError}
        />
      </Head>

      <script src="/assets/rollbar.js"></script>
      <script src="/assets/logger.js"></script>

      <main style={{ padding: 40 }}>
        <h1>Rollbar SSG Test</h1>
            {/* <img
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
            /> */}
            <img
              src="https://example.com/broken.jpg"
              onError={logResourceLoadError}
              alt="Broken"
            />
            {/* <img
              src="/assets/missing-image.png"
              alt="Broken"
              width={200}
              onError={(e) => {
                console.log("Image error triggered", e);
                logResourceLoadError(e);
              }}
            /> */}
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
      <script src="/js/config.js" onError={logResourceLoadError} ></script>
      </main>
    </>
  );
}