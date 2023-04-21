import AuthService from "services/auth.service";
import { initializeStore } from "store";
import { Non200ResponseError } from "./exceptions";

export class HttpBuilder {
    constructor({
        url,
        method,
        params = {},
        isFormData = false,
        baseUrl = process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT as string,
        redirectToLoginPageIfAuthRequired = false,
    }: {
        url: string;
        method: string;
        params?: { [key: string]: string };
        isFormData?: boolean;
        baseUrl?: string;
        redirectToLoginPageIfAuthRequired?: boolean;
    }) {
        this.method = method;
        this.isFormData = isFormData;
        this.redirectToLoginPageIfAuthRequired =
            redirectToLoginPageIfAuthRequired;

        // Build headers start
        type HttpHeader = {
            "Content-Type"?: string;
            Accept: string;
            Authorization?: string;
        };
        const headers: HttpHeader = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };
        if (this.isFormData) {
            delete headers["Content-Type"];
        }
        this.headers = headers;
        // Build headers end

        // Build full URL start
        let httpParams = Object.keys(params)
            .map(
                (k) =>
                    `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
            )
            .join("&");
        // Prepend `?` if parms are non empty
        if (httpParams) httpParams = `?${httpParams}`;
        this.fullUrl = `${baseUrl}${url}${httpParams}`;
        // Build full URL end
    }

    fullUrl: string;
    method: string;
    isFormData: boolean;
    headers: { [key: string]: string };
    body: string | FormData | undefined;
    redirectToLoginPageIfAuthRequired: boolean;

    addHeaders = (extraHeaders = {}) => {
        this.headers = { ...this.headers, ...extraHeaders };
        return this;
    };

    addAuthorizationHeader = () => {
        const store = initializeStore();
        const accessToken = store.getState().auth.token;
        if (accessToken) {
            this.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return this;
    };

    addBody = (body: { [key: string]: any } | FormData) => {
        if (this.isFormData) {
            this.body = body as FormData; // TODO: handle this better
        } else {
            this.body = JSON.stringify(body);
        }
        return this;
    };

    run = async ({
        retries = 1,
        tryRefreshingToken = true,
    }: {
        retries?: number;
        tryRefreshingToken?: boolean;
    } = {}): Promise<any> => {
        const response = await fetch(this.fullUrl, {
            credentials: "include",
            method: this.method,
            headers: this.headers,
            ...(this.body !== undefined && { body: this.body }),
        });
        // Response is not ok when status not in the range 200-299
        if (!response.ok) {
            // When not authenticated; try refreshing the access token
            if (tryRefreshingToken && response.status === 401) {
                const didRefreshToken = await AuthService.refreshAccessToken();
                if (didRefreshToken) {
                    this.addAuthorizationHeader();
                    return await this.run({ retries: retries - 1 });
                }
            }

            // Retry when not ok
            if (retries > 0) {
                return await this.run({ retries: retries - 1 });
            }

            let error;
            if (response.status === 401) {
                error = new Non200ResponseError("Please login to continue", {
                    response: response,
                    status: response.status,
                    url: response.url,
                });
                if (this.redirectToLoginPageIfAuthRequired) {
                    AuthService.logout();
                    return Promise.reject(error);
                }
                // return Promise.reject('Please login to continue')
            } else {
                error = new Non200ResponseError("Non 2xx response", {
                    response: response,
                    status: response.status,
                    url: response.url,
                });
            }
            return Promise.reject(error);
        } else if (response.status == 204) {
            return {};
        } else {
            try {
                const jsonResponse = await response.json();
                return jsonResponse;
            } catch (error) {
                console.error(
                    `Error while while readng response stream from ${response.url}`,
                    error
                );
                return Promise.reject(error);
            }
        }
    };
}

type OptionsType = {
    params?: { [key: string]: string };
    baseUrl?: string;
    extraHeaders?: { [key: string]: string | undefined };
    redirectToLoginPageIfAuthRequired?: boolean;
};

class Http {
    /**
     * Make a get request
     *
     * @param url - url to which the get request is to be made
     * @param params - Object containing the query params for the request
     * @param baseUrl - The base url to be used to override the default base url
     * @returns - parsed json response
     */
    static async get<T = any>(
        url: string,
        {
            params = {},
            baseUrl,
            extraHeaders = {},
            redirectToLoginPageIfAuthRequired = true,
        }: OptionsType = {}
    ): Promise<T> {
        return new HttpBuilder({
            url,
            method: "GET",
            params,
            baseUrl,
            redirectToLoginPageIfAuthRequired,
        })
            .addHeaders(extraHeaders)
            .addAuthorizationHeader()
            .run();
    }

    /**
     * Make a post request
     *
     * @param {String} url - url to which the get request is to be made
     * @param {Object} params - Object containing the query params for the request
     * @param baseUrl - The base url to be used to override the default base url
     * @returns {Object} - parsed json response
     */
    static async post<T = any>(
        url: string,
        data = {},
        {
            params = {},
            baseUrl,
            extraHeaders = {},
            redirectToLoginPageIfAuthRequired = true,
        }: OptionsType = {}
    ): Promise<T> {
        return new HttpBuilder({
            url,
            method: "POST",
            params,
            baseUrl,
            redirectToLoginPageIfAuthRequired,
        })
            .addHeaders(extraHeaders)
            .addAuthorizationHeader()
            .addBody(data)
            .run();
    }

    /**
     * Make a DELETE request
     *
     * @param  url - url to which the get request is to be made
     * @param  params - Object containing the query params for the request
     * @param baseUrl - The base url to be used to override the default base url
     * @returns  - parsed json response
     */
    static async delete<T = any>(
        url: string,
        data = {},
        {
            params = {},
            baseUrl,
            extraHeaders = {},
            redirectToLoginPageIfAuthRequired = true,
        }: OptionsType = {}
    ): Promise<T> {
        return new HttpBuilder({
            url,
            method: "DELETE",
            params,
            baseUrl,
            redirectToLoginPageIfAuthRequired,
        })
            .addHeaders(extraHeaders)
            .addAuthorizationHeader()
            .addBody(data)
            .run();
    }

    /**
     * Make a PATCH request
     *
     * @param  url - url to which the get request is to be made
     * @param  params - Object containing the query params for the request
     * @returns  - parsed json response
     */
    static async patch<T = any>(
        url: string,
        data = {},
        {
            params = {},
            baseUrl,
            extraHeaders = {},
            redirectToLoginPageIfAuthRequired = true,
        }: OptionsType = {}
    ): Promise<T> {
        return new HttpBuilder({
            url,
            method: "PATCH",
            params,
            baseUrl,
            redirectToLoginPageIfAuthRequired,
        })
            .addHeaders(extraHeaders)
            .addAuthorizationHeader()
            .addBody(data)
            .run();
    }

    /**
     * Make a PUT request
     *
     * @param  url - url to which the get request is to be made
     * @param  params - Object containing the query params for the request
     * @param baseUrl - The base url to be used to override the default base url
     * @returns  - parsed json response
     */
    static async put<T = any>(
        url: string,
        data = {},
        {
            params = {},
            baseUrl,
            extraHeaders = {},
            redirectToLoginPageIfAuthRequired = true,
        }: OptionsType = {}
    ): Promise<T> {
        return new HttpBuilder({
            url,
            method: "PUT",
            params,
            baseUrl,
            redirectToLoginPageIfAuthRequired,
        })
            .addHeaders(extraHeaders)
            .addAuthorizationHeader()
            .addBody(data)
            .run();
    }
}

export default Http;
