// Response.ts

/**
 * Response class represents the API response.
 */
class Response {
    public result: any;
    public code: number | null;
    public error: any;

    /**
     * Creates a new Response instance.
     *
     * @param result - The result data.
     * @param code - The HTTP status code.
     * @param error - The error information, if any.
     */
    constructor(result: any = null, code: number | null = null, error: any = null) {
        this.result = result;
        this.code = code;
        this.error = error;
    }

    /**
     * Checks if the response is successful.
     *
     * @returns {boolean} True if the HTTP status code is between 200 and 299, otherwise false.
     */
    isSuccess(): boolean {
        return this.code !== null && this.code >= 200 && this.code <= 299;
    }
}

export default Response;
