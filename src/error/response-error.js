/**
 * Class that represent an invalid response.
 * @extends {Error}
 */

export default class ResponseError extends Error {
  /**
   * Create instance from ResponseError class.
   *
   * @param {string} [type="api"] - The error type [web | api] (default: "api").
   * @param {number} code - Error http status code.
   * @param {string} message - Error message.
   */
  constructor(type = "api", code, message) {
    message = message ? message : "Internal Server Error!";

    super(message);
    /**
     * Error type.
     * @type {string} - [web | api].
     */
    this.type = type;

    /**
     * Error code.
     * @type {number} - A http status code.
     */
    this.code = code || 500;
  }
}
