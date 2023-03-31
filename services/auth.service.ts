import { AUTH_TOKEN } from "common/constants/cookie.key";
import { deleteCookie, saveCookie } from "common/utils/cookie.util";
import User from "models/user.model";
import Router from "next/router";
import toast from "react-hot-toast";
import { initializeStore } from "store";
import { logoutUser, updateToken, updateUser } from "store/auth/auth.action";
import Http from "common/http";
import UserService from "./user.service";

class AuthService {
    static async signin(
        user: User,
        token: string,
        redirectback:boolean,
        redirectUrl: string,
        fetchNotifications: Function
    ) {
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
        // Router.push(redirectUrl);
        // redirectback ? Router.back() : Router.push(redirectUrl);
        // 2. add token and role to cookie
        // The token is added as a secure cookie[`auth_token`] by the backend api
        // 3. Fetch user service APIs data after login
        const res_userlistitems = await Http.get(
            `/v1/user-bookmarks/userlistitems`
        );
        UserService.update(res_userlistitems);
        // 4. Fetch user notifications
        fetchNotifications(user);
        // 5. redirect
        redirectback ? Router.back() : Router.push(redirectUrl);
        toast.success("You have successfully signed in");
    }

    /**
     * Logout a currently logged in user
     *
     * Remove saved user data from redux
     * delete cookie
     * redirect user to signin page
     */
    static async logout(redirectUrl = "/login") {
        await Http.delete('/v1/users/logout'); // Delete `auth_token` secure cookie
        const store = initializeStore();
        store.dispatch(logoutUser());
        UserService.clear();
        Router.push(redirectUrl);
    }
}

export default AuthService;
