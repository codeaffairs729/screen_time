import fetch from "isomorphic-unfetch";
import Router from "next/router";

import { Non200ResponseError } from "common/exceptions";
import log from "common/logger";
import { initializeStore } from "store";
import AuthService from "services/auth.service";

/**
 * Parse a fetch response
 */
async function parseHttpResponse(
    response: Response,
    redirectToLoginPageIfAuthRequired: boolean = true
) {
    if (!response.ok) {
        let error;
        if (response.status === 401) {
            if (redirectToLoginPageIfAuthRequired) {
                AuthService.logout();
            }
            error = new Non200ResponseError("Please login to continue", {
                response: response,
                status: response.status,
                url: response.url,
            });
            // return Promise.reject('Please login to continue')
        } else {
            error = new Non200ResponseError("Non 2xx response", {
                response: response,
                status: response.status,
                url: response.url,
            });
        }
        return Promise.reject(error);
    }
    if (response.status == 204) {
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
            return {};
        }
    }
}

/**
 * Build headers like `Authorization` before making a request
 */
function buildHeaders(extraHeaders = {}, isPostForm = false) {
    type HttpHeader = {
        "Content-Type"?: string;
        Accept: string;
        Authorization?: string;
    };
    const headers: HttpHeader = {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...extraHeaders,
    };
    if (isPostForm) {
        delete headers["Content-Type"];
    }
    // Redux store is only available on the browser
    const store = initializeStore();
    let authToken = store.getState().auth.token;
    if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
    }
    return headers;
}

/**
 * Build a complete url for request from a relative url
 * Prepends base url and apppends query parmas
 */
function buildUrl(
    url: string,
    params: { [key: string]: any } = {},
    baseUrl?: string
): string {
    // Build Query params
    let httpParams = Object.keys(params)
        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join("&");
    // Prepend `?` if parms are non empty
    if (httpParams) httpParams = `?${httpParams}`;
    // const httpUrl = `${API.baseUrl}${url}${httpParams}`;
    const httpUrl = `${
        baseUrl ? baseUrl : process.env.NEXT_PUBLIC_WEBPORTAL_API_ROOT
    }${url}`;
    // const httpUrl = `${process.env.NEXT_PUBLIC_PUBLIC_API_ROOT}${url}${httpParams}`;
    return `${httpUrl}${httpParams}`;
}

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
            baseUrl = "",
            extraHeaders = {},
            redirectToLoginPageIfAuthRequired = true,
        } = {}
    ): Promise<T> {
        // Build api end point along with query params
        const httpUrl = buildUrl(url, params, baseUrl);
        let result: T;
        try {
            // TODO: Handle various fetch fails
            const response = await fetch(httpUrl, {
                credentials: "include",
                method: "GET",
                headers: buildHeaders(extraHeaders),
            });

            result = await parseHttpResponse(
                response,
                redirectToLoginPageIfAuthRequired
            );
        } catch (error) {
            log.error(
                `Something went wrong while making the get request to ${httpUrl}`,
                error
            );
            throw error;
        }
        return result;
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
            baseUrl = "",
            extraHeaders = {},
            redirectToLoginPageIfAuthRequired = true,
        } = {}
    ): Promise<T> {
        // // Build Query params
        const httpUrl = buildUrl(url, params, baseUrl);
        let result: T;
        try {
            // TODO: Handle various fetch fails
            const response = await fetch(httpUrl, {
                credentials: "include",
                method: "POST",
                headers: buildHeaders(extraHeaders),
                body: JSON.stringify(data),
            });
            result = await parseHttpResponse(
                response,
                redirectToLoginPageIfAuthRequired
            );
        } catch (error) {
            log.error(
                `Something went wrong while making the post request to ${httpUrl}`,
                error
            );
            throw error;
        }
        return result;
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
            baseUrl = "",
            extraHeaders = {},
            redirectToLoginPageIfAuthRequired = true,
        } = {}
    ): Promise<T> {
        // // Build url and uery params
        const httpUrl = buildUrl(url, params, baseUrl);
        let result: T;
        try {
            // TODO: Handle various fetch fails
            const response = await fetch(httpUrl, {
                credentials: "include",
                method: "DELETE",
                headers: buildHeaders(extraHeaders),
                body: JSON.stringify(data),
            });
            result = await parseHttpResponse(
                response,
                redirectToLoginPageIfAuthRequired
            );
        } catch (error) {
            log.error(
                `Something went wrong while making the delete request to ${httpUrl}`,
                error
            );
            throw error;
        }
        return result;
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
            baseUrl = "",
            extraHeaders = {},
            redirectToLoginPageIfAuthRequired = true,
        } = {}
    ): Promise<T> {
        // // Build url and uery params
        const httpUrl = buildUrl(url, params, baseUrl);
        let result: T;
        try {
            // TODO: Handle various fetch fails
            const response = await fetch(httpUrl, {
                credentials: "include",
                method: "PATCH",
                headers: buildHeaders(extraHeaders),
                body: JSON.stringify(data),
            });
            result = await parseHttpResponse(
                response,
                redirectToLoginPageIfAuthRequired
            );
        } catch (error) {
            log.error(
                `Something went wrong while making the patch request to ${httpUrl}`,
                error
            );
            throw error;
        }
        return result;
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
            baseUrl = "",
            extraHeaders = {},
            redirectToLoginPageIfAuthRequired = true,
        } = {}
    ): Promise<T> {
        // // Build url and uery params
        const httpUrl = buildUrl(url, params, baseUrl);
        let result: T;
        try {
            // TODO: Handle various fetch fails
            const response = await fetch(httpUrl, {
                credentials: "include",
                method: "PUT",
                headers: buildHeaders(extraHeaders),
                body: JSON.stringify(data),
            });
            result = await parseHttpResponse(
                response,
                redirectToLoginPageIfAuthRequired
            );
        } catch (error) {
            log.error(
                `Something went wrong while making the put request to ${httpUrl}`,
                error
            );
            throw error;
        }
        return result;
    }

    /**
     * Post form data
     */
    static async postFormData<T>(
        url: string,
        data: FormData,
        {
            params = {},
            baseUrl = "",
            extraHeaders = {},
            redirectToLoginPageIfAuthRequired = true,
        } = {}
    ): Promise<T> {
        // const httpUrl = buildUrl(url);
        const httpUrl = buildUrl(url, params, baseUrl);
        let result: T;
        try {
            const response = await fetch(httpUrl, {
                credentials: "include",
                method: "POST",
                headers: buildHeaders(extraHeaders, true),
                body: data,
            });
            result = await parseHttpResponse(
                response,
                redirectToLoginPageIfAuthRequired
            );
        } catch (error) {
            log.error(
                `Something went wrong while making the form data request to ${httpUrl}`,
                error
            );
            throw error;
        }
        return result;
    }

    /**
     * Download a file from the server
     */
    // static async download(url: string, { params = {} } = {}): Promise<void> {
    //   const httpUrl = buildUrl(url, params, baseUrl);
    //   try {
    //     const response = await fetch(httpUrl, {
    //       method: 'GET',
    //       headers: buildHeaders(),
    //     });
    //     const blob = await response.blob();
    //     // console.log('headers', response.headers);
    //     // response.headers.forEach(console.log);
    //     // for(let entry of response.headers.entries()) {
    //     //   console.log(entry);
    //     // }

    //     saveAs(blob, 'file.xlsx');
    //     // await response
    //     //   .then((res) => res.blob())
    //     //   .then((blob) => {
    //     //   });
    //   } catch (error) {
    //     log.error(
    //       `Something went wrong while making the form data request to ${httpUrl}`,
    //       error
    //     );
    //     throw error;
    //   }
    // }
}

export default Http;
