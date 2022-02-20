import "styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { useStore } from "store";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });

  if (!(typeof window === "undefined")) {
    const reduxVersion = 0.1;
    const currentReduxVersion = Number(localStorage.getItem("reduxVersion"));
    if (currentReduxVersion != reduxVersion) {
      localStorage.setItem("reduxVersion", JSON.stringify(reduxVersion));
      persistor.purge();
      window.location.reload();
    }
  }
  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading</div>} persistor={persistor}>
        <Component {...pageProps} />
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            // style: {
            //   background: "#363636",
            //   color: "#fff",
            // },
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
            // Default options for specific types
            // success: {
            //   duration: 3000,
            //   theme: {
            //     primary: "green",
            //     secondary: "black",
            //   },
            // },
          }}
        />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
