// import Router from 'next/router';
// // import { initializeStore } from 'store';
// // import { logoutUser, updateToken, updateUser } from 'store/auth/auth.action';
// // import User from 'models/user.model';
// // import { deleteCookie, saveCookie } from 'common/utils/cookie.util';
// // import { toast } from 'react-toastify';
// // import { AUTH_TOKEN } from 'common/constants/cookie.key';
// // import Rcache from 'common/cache';

// class AuthService {
//   static async signin(user: User, token: string, redirectUrl: string) {
//     /**
//      * Sign a user in
//      *
//      * User details are saved to redux and persisted to localstorage
//      * Auth token is saved to cookie to used in subsequent requests
//      * Redirect user to dashboard
//      */
//     // 1. store user details to store
//     const store = initializeStore();
//     store.dispatch(updateUser(user));
//     store.dispatch(updateToken(token));
//     Router.push(redirectUrl);
//     // 2. add token and role to cookie
//     saveCookie(AUTH_TOKEN, token);
//     // 4. redirect
//     Router.push(redirectUrl);
//     toast.success('You have successfully signed in');
//   }

//   /**
//    * Logout a currently logged in user
//    *
//    * Remove saved user data from redux
//    * delete cookie
//    * redirect user to signin page
//    */
//   static async logout(redirectUrl = '/signin') {
//     const store = initializeStore();
//     store.dispatch(logoutUser());
//     deleteCookie(AUTH_TOKEN);
//     Rcache.clear();
//     Router.push(redirectUrl);
//   }
// }

// export default AuthService;


export {}