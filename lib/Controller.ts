// Controller.ts

import Aisearch from './Aisearch';

/**
 * Controller class for API interactions.
 */
class Controller {
    public site_id!: number;
    public client_token!: string;

    /**
     * Returns the base URL for API requests.
     *
     * @returns {string} Base API URL.
     */
    base(): string {
        return Aisearch.API + "/sites/" + this.site_id + "/" + Aisearch.API_VERSION;
    }
}

export default Controller;
