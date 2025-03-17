// DeleteAction.ts

import {Action} from '../../Action';

/**
 * DeleteAction class
 *
 * This action handles the deletion of a recent search query.
 * It builds the API request URL using the provided parameters,
 * sends a DELETE request to the API, and returns a boolean value
 * indicating whether the deletion was successful (HTTP 204).
 */
class DeleteAction extends Action {
    // The search query to be deleted.
    public query: string = "";
    // The identifier for the user associated with the search query.
    public user_id: string = "";

    /**
     * Sets the search query to be deleted.
     *
     * @returns {DeleteAction} Returns the current instance for chaining.
     * @param query
     */
    public setQuery(query: string): DeleteAction {
        this.query = query;
        return this;
    }

    /**
     * Sets the user ID associated with the search query.
     *
     * @param user_id - The user identifier.
     * @returns {DeleteAction} Returns the current instance for chaining.
     */
    public setUserId(user_id: string): DeleteAction {
        this.user_id = user_id;
        return this;
    }

    /**
     * Builds the full API request URL for deleting a recent search query.
     *
     * This method converts the action parameters to an associative object,
     * builds a query string from these parameters, and appends it to the base URL.
     *
     * @returns {string} The complete API endpoint URL.
     */
    public buildUrl(): string {
        const params = this.paramsToArray();
        const queryString = new URLSearchParams(params).toString();
        return this.controller.base() + "/search/query/recent?" + queryString;
    }

    /**
     * Converts the current action parameters into an associative object.
     *
     * Only the required parameters (client-token and user_id) are included.
     *
     * @returns {Record<string, any>} The object of parameters for the API request.
     */
    public paramsToArray(): Record<string, any> {
        return {
            'client-token': this.controller.client_token,
            'user_id': this.user_id,
        };
    }

    /**
     * Executes the delete action.
     *
     * Sends a DELETE request to the API using the built URL and the query parameter.
     * It returns true if the response code is 204 (No Content), indicating a successful deletion.
     *
     * @returns {Promise<boolean>} True if the deletion was successful; false otherwise.
     */
    public async delete(): Promise<boolean> {
        this.response = await this.request(this.buildUrl(), 'DELETE', { query: this.query });
        return this.response.code === 204;
    }
}

export default DeleteAction;
