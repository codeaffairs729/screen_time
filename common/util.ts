import log from "common/logger";

export const isBrowser = () => {
    return !(typeof window === "undefined");
};

/**
 * Parse error messages from response
 */
export const getHttpErrorMsg = async (
    errorRes: any,
    { defaultMessage = "Something went wrong" } = {}
): Promise<string> => {
    try {
        const body = await errorRes.response.json();
        if (Array.isArray(body["detail"])) {
            // TODO: handle array of array messages
            throw new Error("Error message cannot be an array");
        }
        return body["detail"];
    } catch (error) {
        log.error(error);
        return defaultMessage;
    }
};
