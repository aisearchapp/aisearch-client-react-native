// IndexAction.ts

import {Action} from '../../Action';
import SettingsCtaModel from '../../models/SettingsCtaModel';
import SettingsModel from '../../models/SettingsModel';
import SettingsSubscriptionModel from '../../models/SettingsSubscriptionModel';

/**
 * IndexAction class
 *
 * This action is responsible for fetching the settings configuration from the Aisearch API.
 * It constructs the request URL using the client token and processes the API response
 * into a SettingsModel instance.
 */
class IndexAction extends Action {
    public model: SettingsModel | null = null;

    constructor(controller: any) {
        super(controller);
    }

    /**
     * Builds the full API request URL for retrieving settings.
     *
     * It converts the action parameters into an object, builds a query string from them,
     * and appends it to the base URL.
     *
     * @returns {string} The complete API endpoint URL for the settings.
     */
    public buildUrl(): string {
        const params = this.paramsToArray();
        const queryString = new URLSearchParams(params).toString();
        return this.controller.base() + "/settings?" + queryString;
    }

    /**
     * Converts the required action parameters into an object.
     *
     * Only the client token is required in this case.
     *
     * @returns {Record<string, any>} The object of parameters for the API request.
     */
    public paramsToArray(): Record<string, any> {
        return {
            'client-token': this.controller.client_token,
        };
    }

    /**
     * Executes the settings retrieval action.
     *
     * Sends an API request using the built URL, processes the response,
     * and if successful, creates a SettingsModel with the response data.
     * Otherwise, the model is set to null.
     *
     * @returns {Promise<this>} Returns the current instance with the model populated if successful.
     */
    public async get(): Promise<this> {
        this.response = await this.request(this.buildUrl());
        if (this.response.code === 200) {
            const response = this.response.result;
            this.model = new SettingsModel(
                Boolean(response['status']),
                response['language_id'],
                new SettingsCtaModel(response['cta']['typing']),
                response['currencies'],
                new SettingsSubscriptionModel(response['subscription']['remove_branding'])
            );
        } else {
            this.model = null;
        }
        return this;
    }
}

export default IndexAction;
