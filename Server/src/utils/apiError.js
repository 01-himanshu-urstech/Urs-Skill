class APIError extends Error {
  constructor(statusCode = 500, message = 'Internal Server Error', meta = {}) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;

    // Optional metadata (useful for debugging / logs)
    // this.meta = meta;

    // Mark as operational error (helps in monitoring tools)
    // this.isOperational = true;

    // Proper stack trace
    // if (Error.captureStackTrace) {
    //   Error.captureStackTrace(this, this.constructor);
    // }
  }

  /* =======================
     COMMON ERROR TYPES
  ======================== */

  static validation(message = 'Validation failed', meta = {}) {
    return new APIError(422, message, meta);
  }

  static badRequest(message = 'Bad request', meta = {}) {
    return new APIError(400, message, meta);
  }

  static unauthorized(message = 'Unauthorized access') {
    return new APIError(401, message);
  }

  static forbidden(message = 'Forbidden') {
    return new APIError(403, message);
  }

  static notFound(message = 'Resource not found') {
    return new APIError(404, message);
  }

  static conflict(message = 'Conflict') {
    return new APIError(409, message);
  }

  static notImplemented(message = 'Not implemented') {
    return new APIError(501, message);
  }

  static internal(message = 'Internal server error') {
    return new APIError(500, message);
  }
}

export default APIError;
