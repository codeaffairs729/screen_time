import log from "common/logger";

export const isBrowser = () => {
    return !(typeof window === "undefined");
};

export const getMessageFromResponse = (
    response: any,
    { defaultMessage }: { defaultMessage: string }
) => {
    try {
        if (Array.isArray(response["detail"])) {
            // TODO: handle array of array messages
            throw new Error("Error message cannot be an array");
        }
        if (response["detail"] && response["detail"]["message"]) {
            return response["detail"]["message"];
        }
        return response["detail"] ?? defaultMessage;
    } catch (error) {
        log.error(error);
        return defaultMessage;
    }
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
        return getMessageFromResponse(body, { defaultMessage });
    } catch (error) {
        log.error(error);
        return defaultMessage;
    }
};
