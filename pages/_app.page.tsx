import "styles/globals.css";
import App from "next/app";
import { wrapper } from "store";
import { useStore } from "react-redux";
// import { persistStore } from 'redux-persist';
import { PersistGate } from "redux-persist/integration/react";
import { isBrowser } from "common/util";

function MyApp({ Component, pageProps }: any) {
  const store = useStore();
  return isBrowser() ? (
    <PersistGate
      persistor={(store as any).__persistor}
      loading={<div>Loading</div>}
    >
      <Component {...pageProps} />
    </PersistGate>
  ) : (
    <PersistGate persistor={store} loading={<div>Loading</div>}>
      <Component {...pageProps} />
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
