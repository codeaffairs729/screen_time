import log from "common/logger";

export const isBrowser = () => {
  return !(typeof window === "undefined");
};

/**
 * Parse error messages from response
 */
export const getHttpErrorMsg = async(
  errorRes: any,
  { defaultMessage = "Something went wrong" } = {}
): Promise<string> => {
  try {
    const body = await errorRes.response.json();
    return body["detail"][0];
  } catch (error) {
    log.error(error);
    return defaultMessage;
  }
};
