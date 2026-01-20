import APIError from '../utils/apiError.js';
export const errorMiddleware = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (error instanceof APIError) {
    statusCode = error.statusCode;
    message = error.message;
  }
  else if (error.isAxiosError && error.response) {
    statusCode = error.response.status;
    message = error.response.data?.error?.description || 'External service request failed';
  }
  else if (error.message) {
    statusCode = 400;
    message = error.message;
  }

  // Log full error on server for debugging
  if (process.env.NODE_ENV !== 'production') {
    console.error(' Error:', error);
  }

  // Send ONLY safe data to client (no stack trace)
  res.status(statusCode).json({
    success: false,
    message
  });
};
