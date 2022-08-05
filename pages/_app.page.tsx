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

function DtechtiveApp({ Component, pageProps }: AppProps) {
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

    var MicAccessTool: any;
    useScript("/js/acctoolbar.min.js", () => {
        window.onload = function () {
            (window as any).micAccessTool = new MicAccessTool({
                link: "http://your-awesome-website.com/your-accessibility-declaration.pdf",
                contact: "mailto:your-mail@your-awesome-website.com",
                buttonPosition: "right", // default is 'left'
                // forceLang: "ru-RU", // default is 'en' may be 'he-IL', 'ru-RU', or 'fr_FR'
            });
        };
    });
    // useEffect(() => {
    //     window.onload = function () {
    //         (window as any).micAccessTool = new MicAccessTool({
    //             link: "http://your-awesome-website.com/your-accessibility-declaration.pdf",
    //             contact: "mailto:your-mail@your-awesome-website.com",
    //             buttonPosition: "right", // default is 'left'
    //             // forceLang: "ru-RU", // default is 'en' may be 'he-IL', 'ru-RU', or 'fr_FR'
    //         });
    //     };
    // }, [MicAccessTool]);

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
