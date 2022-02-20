import { useMemo } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import authReducer, {
  initialState as authInitialState,
} from './auth/auth.reducer';
import { AuthState } from './auth/auth.types';
import cacheReducer from './cache/cache.reducer';
import { CacheType } from './cache/cache.type';

export type Action = {
  type: string;
  payload: any;
};

export type RootState = {
  auth: AuthState;
  cache: CacheType;
};

const rootInitialData = {
  auth: authInitialState,
};

const persistConfig = {
  key: 'dtechtive_dashboard_redux',
  storage,
};

const combinedReducer = combineReducers({
  auth: authReducer,
  cache: cacheReducer,
});
const rootReducer = (state: any, action: Action) => {
  if (action.type == 'RESET_APP_STATE') {
    state = undefined;
    storage.removeItem('homdelivery_redux');
  }
  return combinedReducer(state, action);
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
function makeStore(initialState = rootInitialData) {
  return createStore<any, any, any, any>(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  );
}

let store: any;
export const initializeStore = (preloadedState?: RootState) => {
  let _store = store ?? makeStore(preloadedState);
  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined;
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: RootState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
