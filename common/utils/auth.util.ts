import Router from "next/router";
import { initializeStore } from "store";
import { getCookieFromServer } from "./cookie.util";
import { AUTH_TOKEN } from "../constants/cookie.key";
import config from "next.config";

/**
 * Redirect user depending on whether client side or server side
 */
const redirectUser = (ctx, location): void => {
  location = config["basePath"] ? `${config["basePath"]}${location}` : location;
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

/**
 * Check if user is authenticated
 */
const isAuthenticated = (ctx): boolean => {
  const isBrowser = typeof window !== "undefined";

  const store = initializeStore();
  let token: string;

  // 1. If browser check in redux store for token
  if (isBrowser) {
    token = store.getState().auth.token;
  }
  // 2. If server check cookkie for token
  else if (ctx.req.headers.cookie) {
    token = getCookieFromServer(AUTH_TOKEN, ctx.req);
  }
  // 3. Check if token is valid
  // const store = initializeStore();
  // console.log("store", store.getState().tickReducer);
  // TODO: Check if token has expired
  // Router.push("/");

  return !!token;
};

/**
 * Redirect user depending on whether user is logged in or not
 */
const checkAuthentication = (ctx): void => {
  const userIsAuthenticated = isAuthenticated(ctx);

  // If user is authenticated and user is on register or login page then
  // redirect back to home
  console.log("ctx.pathname", ctx.resolvedUrl, userIsAuthenticated);

  if (ctx.resolvedUrl === "/signin" || ctx.resolvedUrl === "/signup") {
    if (userIsAuthenticated) {
      redirectUser(ctx, "/dashboard/map");
    } else {
      return;
    }
  }

  // if (
  //   userIsAuthenticated &&
  //   (ctx.resolvedUrl === "/signin" || ctx.resolvedUrl === "/signup")
  // ) {
  //   // No home page at '/home', hence redirect to dashboard if signed in
  //   redirectUser(ctx, "/dashboard/home");
  // }
  // If user is not authenticated then redirect user to login page
  if (!userIsAuthenticated) {
    redirectUser(ctx, "/signin");
  }
};

export { checkAuthentication, isAuthenticated, redirectUser };
