import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { useStore } from "store";
import "styles/globals.css";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import Loader from "components/UI/loader";
import { useScript } from "common/hooks";
import { useEffect, useRef, useState } from "react";
import { Router, useRouter } from "next/router";
import posthog from "posthog-js";
import { AUTH_TOKEN } from "common/constants/cookie.key";
import {
    NotificationsVM,
    NotificationsVMContext,
    // NotificationsVMContext,
} from "./workspace/notification.vm";
import Head from "next/head";
import IdleTimeoutModal from "./components/idle_timeout";
import CookiePopover from "components/cookies/cookie_popover";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import '../styles/nprogress.css'

NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => {
    NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
    NProgress.done();
});

Router.events.on("routeChangeError", () => {
    NProgress.done();
});

function DtechtiveApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const vm: any = NotificationsVM();
    // const context = NotificationsVMContext;
    const [previousPath, setPreviousPath] = useState("");
    const [loader, setLoader] = useState(false);
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

    useEffect(() => {
        const handleRouteChange = () => {
            const user = store.getState().auth.user;
            if (
                !user &&
                localStorage.getItem("previous_path") == "/account#subscription"
            ) {
                localStorage.setItem("previous_path", "/account#subscription");
            } else {
                localStorage.setItem("previous_path", previousPath);
            }

            if (!router.pathname.includes("/login")) {
                if (router.pathname.includes("/forgot-password")) {
                    const searchParams = new URLSearchParams(router.asPath);
                    const pathParam = searchParams.get("path");

                    if (pathParam) {
                        const pathValue = pathParam.split("&")[0];
                        setPreviousPath(pathValue as string);
                    }
                } else setPreviousPath(router.asPath);
            }
        };

        router.events.on("routeChangeComplete", handleRouteChange);

        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.asPath]);

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
            if (
                !router.pathname.includes("/login") &&
                !router.pathname.includes("/forgot-password")
            ) {
                setPreviousPath(router.asPath);
            }
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
    useEffect(() => {
        const user = store.getState().auth.user;
        if (document.cookie.includes(AUTH_TOKEN) && user)
            vm.fetchNotifications(user);
    }, []);

    useEffect(() => {
        const handleRouteStart = (url: any) => {
            setLoader(true);
        };
        const handleRouteComplete = (url: any) => {
            setLoader(false);
        };

        router.events.on("routeChangeStart", handleRouteStart);
        router.events.on("routeChangeComplete", handleRouteComplete);

        return () => {
            router.events.off("routeChangeStart", handleRouteStart);
            router.events.off("routeChangeComplete", handleRouteComplete);
        };
    }, [router.events]);
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/Dtechtive_Favicon.svg" />
                <title>Dtechtive | Making datasets discoverable</title>
                <meta
                    name="description"
                    content="Dtechtive discovers the datasets other search engines cannot reach. It also provides insights on dataset quality and usage, to help both data users and data providers."
                />
            </Head>
            <Provider store={store}>
                <PersistGate
                    loading={
                        <div className="w-screen h-screen flex items-center justify-center">
                            <Loader />
                        </div>
                    }
                    persistor={persistor}
                >
                    <NotificationsVMContext.Provider value={vm}>
                        <CookiePopover />
                        <Component {...pageProps} />
                    </NotificationsVMContext.Provider>
                    <Toaster
                        position="bottom-center"
                        reverseOrder={false}
                        toastOptions={{
                            className: "dtechtive-toast-container",
                        }}
                    />
                    <IdleTimeoutModal />
                </PersistGate>
            </Provider>
        </>
    );
}

export default DtechtiveApp;
