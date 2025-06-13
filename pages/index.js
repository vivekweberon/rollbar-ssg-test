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

  // function logResourceLoadError(event) {
  //   console.log("logResourceLoadError called with event - server", event);
  //   let src = event?.currentTarget?.src || event?.target?.src || event?.srcElement?.src || "unknown";
  //   let err = "Error loading: '" + src + "'";
  //   Rollbar.error(err);
  //   return false;
  // }

  // function logResourceLoadError(ref) {
  //   console.log("logResourceLoadError called with ref - client", ref);
  //   let err = "Error loading: '"+ (ref.src || ref.href) +"'";
  //   Rollbar.error(err);
  //   console.log(err);
  //   return false;
  // }

  function logResourceLoadError(input) {
    let src = "unknown";

    // If called with an event object (e.g., from onError handler)
    if (input?.target || input?.currentTarget || input?.srcElement) {
      console.log("logResourceLoadError called with event - server", input);
      src = input.currentTarget?.src || input.target?.src || input.srcElement?.src || "unknown";
    } 
    // If called with a direct ref (like an img or link element)
    else if (input?.src || input?.href) {
      console.log("logResourceLoadError called with ref - client", input);
      src = input.src || input.href || "unknown";
    } 
    // Fallback
    else {
      console.log("logResourceLoadError called with unknown input", input);
    }

    const err = `Error loading: '${src}'`;
    if (typeof Rollbar !== "undefined" && Rollbar.error) {
      Rollbar.error(err);
    }
    console.log(err);
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
          onerror="logResourceLoadError(this)"
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
          onError={logResourceLoadError}
        />
        <Script
          src="/assets/missing-after.js"
          strategy="afterInteractive"
          onError={logResourceLoadError}
        />
      <script src="/js/config.js" onError={logResourceLoadError} ></script>
      </main>
    </>
  );
}