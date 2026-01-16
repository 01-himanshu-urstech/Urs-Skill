import APIError from '../utils/apiError.js';

export const errorMiddleware = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'Internal Server Error';
    const response = {
        success: false,
    };

    // Custom application errors
    if (error instanceof APIError) {
        statusCode = error.statusCode;
        message = error.message;
    }

    // Axios  errors
    else if (error.isAxiosError && error.response) {
        statusCode = error.response.status;
        message =
            error.response.data?.error?.description ||
            'Razorpay request failed';

        // Optional: expose Razorpay error in dev
        if (process.env.NODE_ENV === 'development') {
            response.razorpay = error.response.data;
        }
    }

    //  Generic JS errors (e.g. throw new Error())
    else if (error.message) {
        statusCode = 400;
        message = error.message;
    }

    response.message = message;

    // Stack only in development
    if (process.env.NODE_ENV === 'development') {
        response.stack = error.stack;
    }

    console.error('Global Error:', message);
    res.status(statusCode).json(response);
};