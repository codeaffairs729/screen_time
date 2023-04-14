import { AUTH_TOKEN } from "common/constants/cookie.key";
import { deleteCookie, saveCookie } from "common/utils/cookie.util";
import User from "models/user.model";
import Router from "next/router";
import toast from "react-hot-toast";
import { initializeStore } from "store";
import { logoutUser, updateToken, updateUser } from "store/auth/auth.action";
import Http, { HttpBuilder } from "common/http";
import UserService from "./user.service";

class AuthService {
    static async signin(
        user: User,
        token: string,
        redirectback: boolean,
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
        try {
            const res_userlistitems = await Http.get(
                `/v1/user-bookmarks/userlistitems`
            );
            UserService.update(res_userlistitems);
        } catch (error) {
            console.log(error);
        }
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
        try {
            await new HttpBuilder({
                url: `/v1/users/logout`,
                method: "DELETE",
                params: {},
                redirectToLoginPageIfAuthRequired: false,
            })
                .addAuthorizationHeader()
                .run({ retries: 0, tryRefreshingToken: false });
            const store = initializeStore();
            store.dispatch(logoutUser());
            UserService.clear();
            Router.push(redirectUrl);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while logging out");
        }
    }

    /**
     * Return true when we were able to successfully refresh the access token
     */
    static refreshAccessToken = async (): Promise<boolean> => {
        try {
            const res = await new HttpBuilder({
                url: `/v1/users/refresh`,
                method: "POST",
                redirectToLoginPageIfAuthRequired: true,
            })
                .addAuthorizationHeader()
                .run({ retries: 0, tryRefreshingToken: false });

            const store = initializeStore();
            store.dispatch(updateUser(User.fromJson(res["user"])));
            store.dispatch(updateToken(res["token"]));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };
}

export default AuthService;
