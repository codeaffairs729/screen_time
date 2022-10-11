import { useMemo } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import authReducer, {
    initialState as authInitialState,
} from "./auth/auth.reducer";
import { Action, AuthState } from "./auth/auth.type";
import cacheReducer from "./cache/cache.reducer";
import { CacheType } from "./cache/cache.type";
import userReducer, {
    initialState as userInitialState,
} from "./user/user.reducer";
import { UserState } from "./user/user.type";

export type RootState = {
    auth: AuthState;
    cache: CacheType;
    user: UserState;
};

const rootInitialData = {
    auth: authInitialState,
    user: userInitialState,
};

const persistConfig = {
    key: "dtechtive_dashboard_redux",
    storage,
};

const combinedReducer = combineReducers({
    auth: authReducer,
    cache: cacheReducer,
    user: userReducer,
});

const rootReducer = (state: RootState | undefined, action: Action) => {
    if (action.type == "RESET_APP_STATE") {
        state = undefined;
        storage.removeItem("dtechtive_dashboard_redux");
    }
    return combinedReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function makeStore(initialState = rootInitialData) {
    return createStore<any, any, any, any>(
        persistedReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunk))
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
    if (typeof window === "undefined") return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
};

export function useStore(initialState: RootState) {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
}
