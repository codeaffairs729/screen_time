import Cookies from 'js-cookie';

/**
 * Reteive cookie value from request headers
 *
 * @returns {String} - Authorization token
 */
export const getCookieFromServer = (key, req) => {
  const isBrowser = typeof window !== 'undefined';
  if (isBrowser) {
    return undefined;
  }
  // Split cookie header to separate cookies
  const rawCookies = req.headers.cookie
    .split(';')
    .filter((e) => e.trim().startsWith(`${key}=`));

  if (!rawCookies.length) {
    return undefined;
  }
  const cookie = rawCookies[0].trim().split('=')[1];
  return cookie;
};

/**
 * Set cookie
 */
export const saveCookie = (key, value): void => {
  Cookies.set(key, value);
};

/**
 * Delete a cookie
 */
export const deleteCookie = (key): void => {
  Cookies.remove(key);
};

