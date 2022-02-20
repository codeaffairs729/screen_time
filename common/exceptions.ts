/* eslint max-classes-per-file: 0 */

/**
 * Error class representing a non 2xx response
 */
export class Non200ResponseError extends Error {
  /**
   * Create a Non200ResponseError instance
   *
   * @param message - Error message
   * @param response - response of the request
   * @param status - status code of the response
   * @param url - URL of the api request
   */
  constructor(
    message: string,
    {
      response,
      status,
      url,
    }: { response: Response; status: number; url: string }
  ) {
    super(message);
    this.response = response;
    this.status = status;
    this.url = url;
  }

  response: Response;
  status: number;
  url: string;
}

// class UnprocessableEntity extends Error {
//   constructor(
//     message: string,
//     { response, url }: { response: Response; url: string }
//   ) {
//     super(message);
//     this.response = response;
//     this.status = 422;
//     this.url = url;
//   }

//   response: Response;
//   status: number;
//   url: string;
// }

// export { Non200ResponseError, UnprocessableEntity };
