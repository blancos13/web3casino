import { SettingsInit } from "@/widgets/SettingsInit";
import { Head, Html, Main, NextScript } from "next/document";
import { useEffect } from "react";
// TODO: fix meta - delete meta tag from <Head />  #24 @habdevs
const preloadModel = async () => {
  await import("@/widgets/Dice/DiceModel");
};

export default function Document() {
  useEffect(() => {
    preloadModel();
  }, []);
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preload" href="/dice/dice_animation.glb" as="script" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-chrome-192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/android-chrome-512.png"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/Apple180.png" />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="16x16"
          href="/favicon16.ico"
        />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="32x32"
          href="/favicon32.ico"
        />
        <link
          rel="icon"
          type="image/x-icon"
          sizes="48x48"
          href="/favicon48.ico"
        />
        <noscript>
          <img
            height="1"
            width="1"
            src="https://www.facebook.com/tr?id=1797283080715437&ev=PageView
                &noscript=1"
          />
        </noscript>
        {/* <!-- End Facebook Pixel Code --> */}
      </Head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NDJSCGDF"height="0" width="0" style="display:none;visibility:hidden"></iframe>'
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
