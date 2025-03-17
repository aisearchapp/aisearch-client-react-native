// Aisearch.ts

import SearchController from './controllers/SearchController';
import SettingsController from './controllers/SettingsController';
import SearchRecentQueryController from './controllers/SearchRecentQueryController';
import RecommendationController from './controllers/RecommendationController';

/**
 * Main SDK client class for interacting with the Aisearch API.
 * Provides factory methods to access different API controllers.
 */
class Aisearch {
    // Base API URL.
    static API: string = 'https://api.aisearch.app';
    // API version used in requests.
    static API_VERSION: string = 'v1';

    private site_id: number;
    private client_token: string;

    /**
     * Aisearch constructor.
     *
     * @param site_id - The site ID for the API.
     * @param client_token - The client token for authentication.
     */
    constructor(site_id: number, client_token: string) {
        this.site_id = site_id;
        this.client_token = client_token;
    }

    /**
     * Creates and returns a new SearchController instance.
     *
     * @returns {SearchController} Controller to handle search requests.
     */
    search(): SearchController {
        const controller = new SearchController();
        // Pass the site ID and client token to the controller.
        controller.site_id = this.site_id;
        controller.client_token = this.client_token;
        return controller;
    }

    /**
     * Creates and returns a new SettingsController instance.
     *
     * @returns {SettingsController} Controller to manage settings.
     */
    settings(): SettingsController {
        const controller = new SettingsController();
        // Pass the site ID and client token to the controller.
        controller.site_id = this.site_id;
        controller.client_token = this.client_token;
        return controller;
    }

    /**
     * Creates and returns a new SearchRecentQueryController instance.
     *
     * @returns {SearchRecentQueryController} Controller for recent search queries.
     */
    searchRecentQuery(): SearchRecentQueryController {
        const controller = new SearchRecentQueryController();
        // Pass the site ID and client token to the controller.
        controller.site_id = this.site_id;
        controller.client_token = this.client_token;
        return controller;
    }

    /**
     * Creates and returns a new RecommendationController instance.
     *
     * @returns {RecommendationController} Controller to manage recommendations.
     */
    recommendation(): RecommendationController {
        const controller = new RecommendationController();
        // Pass the site ID and client token to the controller.
        controller.site_id = this.site_id;
        controller.client_token = this.client_token;
        return controller;
    }
}

export default Aisearch;
