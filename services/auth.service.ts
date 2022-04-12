import { AUTH_TOKEN } from 'common/constants/cookie.key';
import { deleteCookie, saveCookie } from 'common/utils/cookie.util';
import User from 'models/user.model';
import Router from 'next/router';
import toast from 'react-hot-toast';
import { initializeStore } from 'store';
import { logoutUser, updateToken, updateUser } from 'store/auth/auth.action';

class AuthService {
  static async signin(user: User, token: string, redirectUrl: string) {
    /**
     * Sign a user in
     *
     * User details are saved to redux and persisted to localstorage
     * Auth token is saved to cookie to used in subsequent requests
     * Redirect user to dashboard
     */
    // 1. store user details to store
    const store = initializeStore();
    store.dispatch(updateUser(user));
    store.dispatch(updateToken(token));
    Router.push(redirectUrl);
    // 2. add token and role to cookie
    saveCookie(AUTH_TOKEN, token);
    // 4. redirect
    Router.push(redirectUrl);
    toast.success('You have successfully signed in');
  }

  /**
   * Logout a currently logged in user
   *
   * Remove saved user data from redux
   * delete cookie
   * redirect user to signin page
   */
  static async logout(redirectUrl = '/login') {
    const store = initializeStore();
    store.dispatch(logoutUser());
    deleteCookie(AUTH_TOKEN);
    Router.push(redirectUrl);
  }
}

export default AuthService;
