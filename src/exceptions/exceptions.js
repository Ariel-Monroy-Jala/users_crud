export class ApiException extends Error {
  /**
   * Creates a new Api Exception   *
   * @param {number} statusCode HTTP status code for reponse.
   * @param {string} message message to return in respose.
   */
  constructor (statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class NotFoundException extends ApiException {
  /**
   *  Creates a Not Found Exception
   * @param {string} message Message for NotFoundExeption
   */
  constructor (message) {
    super(404, message);
  }
}

export class ValidationException extends ApiException {
  /**
   *  Creates a new Validation
   * @param {string} message message Message for NotFoundExeption
   */
  constructor (message) {
    super(400, message);
  }
}
