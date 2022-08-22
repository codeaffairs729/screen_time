// import "styles/globals.css";
// import App from "next/app";
// import { wrapper } from "store";
// import { useStore } from "react-redux";
// // import { persistStore } from 'redux-persist';
// import { PersistGate } from "redux-persist/integration/react";
// import { isBrowser } from "common/util";

// function MyApp({ Component, pageProps }: any) {
//   const store = useStore();
//   return isBrowser() ? (
//     <PersistGate
//       persistor={(store as any).__persistor}
//       loading={<div>Loading</div>}
//     >
//       <Component {...pageProps} />
//     </PersistGate>
//   ) : (
//     <PersistGate persistor={store} loading={<div>Loading</div>}>
//       <Component {...pageProps} />
//     </PersistGate>
//   );
// }

// export default wrapper.withRedux(MyApp);

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { useStore } from "store";
import "styles/globals.css";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Loader from "components/UI/loader";
import { useScript } from "common/hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";
import posthog from "posthog-js";

function DtechtiveApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const store = useStore(pageProps.initialReduxState);
    const persistor = persistStore(store, {}, function () {
        persistor.persist();
    });

    if (!(typeof window === "undefined")) {
        const reduxVersion = 0.1;
        const currentReduxVersion = Number(
            localStorage.getItem("reduxVersion")
        );
        if (currentReduxVersion != reduxVersion) {
            localStorage.setItem("reduxVersion", JSON.stringify(reduxVersion));
            persistor.purge();
            window.location.reload();
        }
    }

    useScript("/js/acctoolbar.min.js");

    useEffect(() => {
        // Init PostHog
        posthog.init(
            process.env.NEXT_PUBLIC_POSTHOG_KEY ??
                "phc_HfQBhd9FAx2wjqftT9wxQMRa1HUotiFp6QINKAU2Tb9",
            {
                api_host: "https://app.posthog.com",
                loaded: (posthog) => {
                    if (process.env.NODE_ENV === "development")
                        posthog.opt_out_capturing();
                },
            }
        );

        const handleRouteChange = () => {
            posthog.capture("$pageview");
        };
        //When the component is mounted, subscribe to router changes
        //and log those page views
        router.events.on("routeChangeComplete", handleRouteChange);

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return (
        <>
            <Provider store={store}>
                <PersistGate
                    loading={
                        <div className="w-screen h-screen flex items-center justify-center">
                            <Loader />
                        </div>
                    }
                    persistor={persistor}
                >
                    <Component {...pageProps} />
                    <Toaster
                        position="bottom-center"
                        reverseOrder={false}
                        toastOptions={{
                            className: "dtechtive-toast-container",
                        }}
                    />
                </PersistGate>
            </Provider>
        </>
    );
}

export default DtechtiveApp;
