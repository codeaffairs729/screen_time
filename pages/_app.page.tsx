import "styles/globals.css";
import type { AppProps } from "next/app";
import ReactTooltip from "react-tooltip";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ReactTooltip uuid="dtechtive-global-tooltip" />
    </>
  );
}

export default MyApp;
