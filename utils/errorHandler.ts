// utils/errorHandler.ts

export const handleApiError = (error: any): string => {
    let errorMessage = 'An unexpected error occurred';

    if (error.response) {
        // Server responded with a status other than 2xx
        const { data, status } = error.response;

        // Handle validation errors (422 status code)
        if (status === 422 && data.errors && Array.isArray(data.errors)) {
            const validationErrors = data.errors.join(', ');
            errorMessage = `Validation failed: ${validationErrors}`;
        }
        // Handle 404 not found error
        else if (status === 404) {
            errorMessage = data.message || 'Resource not found';
        }
        // Handle 500 internal server error
        else if (status === 500) {
            errorMessage = 'Internal server error. Please try again later.';
        }
        // Handle other 4xx or 5xx errors with descriptive messages
        else if (data && typeof data === 'object') {
            errorMessage = data.message || `Error ${status}: ${data.message || 'A server error occurred'}`;
        }
        // Handle generic string responses from the server
        else if (typeof data === 'string') {
            errorMessage = data;
        }
        // Default message for unknown cases
        else {
            errorMessage = `Error ${status}: ${error.message || 'A server error occurred'}`;
        }
    } else if (error.request) {
        // The request was made but no response was received
        errorMessage = 'No response received from server. Please check your connection.';
    } else {
        // Something else happened in setting up the request
        errorMessage = `Request error: ${error.message}`;
    }

    return errorMessage;
};
