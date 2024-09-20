/**
 * Class that represent an invalid response.
 */

export default class ResponseError extends Error {
  type: string | undefined;
  code: number;
  constructor(
    type: string | undefined = "api",
    code: number,
    message: string | undefined
  ) {
    message = message ? message : "Internal Server Error!";

    super(message);
    this.type = type;
    this.code = code || 500;
  }
}
