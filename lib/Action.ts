// Action.ts

import Response from './Response';

/**
 * Action class for making API requests.
 */
export class Action {
    public controller: any;
    public response: any;

    /**
     * @param controller - The controller instance.
     */
    constructor(controller: any) {
        this.controller = controller;
        this.response = undefined;
    }

    /**
     * Makes a request to the given URL with the specified method and data.
     *
     * @param url - The URL to request.
     * @param method - HTTP method (default is 'GET').
     * @param data - Data to be sent with the request.
     * @returns A promise that resolves to a Response instance.
     */
    public async request(url: string, method: string = 'GET', data: any = {}): Promise<Response> {
        const upperMethod = method.toUpperCase();
        const headers = {
            'User-Agent': 'Aisearch SDK v0.1',
            'Content-Type': 'application/json'
        };

        const options: RequestInit = {
            method: upperMethod,
            headers: headers,
        };

        // Set body for POST, PUT, DELETE, PATCH methods if data is provided.
        if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(upperMethod) && Object.keys(data).length > 0) {
            try {
                options.body = JSON.stringify(data);
            } catch (error: any) {
                throw new Error("JSON encode error: " + error.message);
            }
        }

        // Implementing timeout using AbortController.
        const controllerAbort = new AbortController();
        const timeoutId = setTimeout(() => {
            controllerAbort.abort();
        }, 10000); // 10 seconds timeout.
        options.signal = controllerAbort.signal;

        let fetchResponse: globalThis.Response;
        try {
            fetchResponse = await fetch(url, options);
        } catch (error: any) {
            if (error.name === 'AbortError') {
                throw new Error("Request timeout");
            } else {
                throw new Error("Fetch error: " + error.message);
            }
        } finally {
            clearTimeout(timeoutId);
        }

        let decodedResponse: any = null;
        try {
            const text = await fetchResponse.text();
            if (text) {
                decodedResponse = JSON.parse(text);
            }
        } catch (error: any) {
            throw new Error("JSON decode error: " + error.message);
        }

        // If HTTP status code indicates failure, throw an exception.
        if (fetchResponse.status < 200 || fetchResponse.status >= 300) {
            let errorMsg = `Request failed with HTTP status code ${fetchResponse.status}.`;
            if (decodedResponse && typeof decodedResponse === 'object' && decodedResponse.error) {
                errorMsg += ` Error: ${decodedResponse.error}`;
            }
            throw new Error(errorMsg);
        }

        return new Response(decodedResponse, fetchResponse.status, "");
    }
}
