// DiscoverAction.ts

import {Action} from '../../Action';
import RecommendationDiscoverModel from '../../models/RecommendationDiscoverModel';

/**
 * DiscoverAction class
 *
 * This action handles the retrieval of discovery-based recommendations.
 * It builds an API request using various parameters (user, limit, after cursor, segments)
 * and processes the API response into a RecommendationDiscoverModel.
 */
class DiscoverAction extends Action {
    public user_id: string = "";
    public limit: number = 30;
    public after: string = "";
    public segments: string = "";
    public negative_segments: string = "";
    public model: RecommendationDiscoverModel | null = null;

    /**
     * Gets the user ID.
     *
     * @returns {string} The current user ID.
     */
    public getUserId(): string {
        return this.user_id;
    }

    /**
     * Sets the user ID.
     *
     * @param user_id - The user ID to set.
     * @returns {DiscoverAction}
     */
    public setUserId(user_id: string): DiscoverAction {
        this.user_id = user_id;
        return this;
    }

    /**
     * Sets the segments parameter.
     *
     * @param segments - The segments to filter recommendations.
     * @returns {DiscoverAction}
     */
    public setSegments(segments: string): DiscoverAction {
        this.segments = segments;
        return this;
    }

    /**
     * Sets the negative segments parameter.
     *
     * @param negative_segments - The segments to exclude from recommendations.
     * @returns {DiscoverAction}
     */
    public setNegativeSegments(negative_segments: string): DiscoverAction {
        this.negative_segments = negative_segments;
        return this;
    }

    /**
     * Gets the limit for recommendation results.
     *
     * @returns {number} The current limit.
     */
    public getLimit(): number {
        return this.limit;
    }

    /**
     * Sets the limit for recommendation results.
     *
     * @param limit - The maximum number of recommendations to retrieve.
     * @returns {DiscoverAction}
     */
    public setLimit(limit: number): DiscoverAction {
        this.limit = limit;
        return this;
    }

    /**
     * Gets the current "after" pagination cursor.
     *
     * @returns {string} The pagination cursor.
     */
    public getAfter(): string {
        return this.after;
    }

    /**
     * Sets the "after" pagination cursor.
     *
     * @param after - The pagination cursor to set.
     * @returns {DiscoverAction}
     */
    public setAfter(after: string): DiscoverAction {
        this.after = after;
        return this;
    }

    /**
     * Builds the full API request URL for the discover recommendations.
     *
     * It converts the action parameters to an associative array and appends them as a query string.
     *
     * @returns {string} The complete API endpoint URL.
     */
    public buildUrl(): string {
        const params = this.paramsToArray();
        const queryString = new URLSearchParams(params).toString();
        return this.controller.base() + "/recommendation/discover?" + queryString;
    }

    /**
     * Executes the discover recommendation action.
     *
     * Sends the API request and processes the response.
     * If the HTTP response code is 200, the response is used to create a RecommendationDiscoverModel.
     * Otherwise, the model is set to null.
     *
     * @returns {Promise<DiscoverAction>} Returns the current instance with the model populated if successful.
     */
    public async get(): Promise<this> {
        this.response = await this.request(this.after ? this.after : this.buildUrl());
        if (this.response.code === 200) {
            const response = this.response.result;
            this.model = new RecommendationDiscoverModel(
                response['attributes'],
                response['attribute_parents'],
                response['products'],
                response['count'],
                response['page']
            );
        } else {
            this.model = null;
        }
        return this;
    }

    /**
     * Converts the current action parameters into an associative array.
     *
     * Only non-empty parameters are included.
     *
     * @returns {Record<string, any>} The associative array of parameters for the API request.
     */
    public paramsToArray(): Record<string, any> {
        const params: Record<string, any> = {
            'client-token': this.controller.client_token,
            'user_id': this.user_id,
            'limit': this.limit,
        };
        if (this.after) {
            params['after'] = this.after;
        }
        if (this.segments) {
            params['segments'] = this.segments;
        }
        if (this.negative_segments) {
            params['negative_segments'] = this.negative_segments;
        }
        return params;
    }

    /**
     * Determines whether there is a next page of results.
     *
     * This method checks the current API response to see if the pagination data
     * indicates the existence of a next page. If the 'has_next' value in the 'page' object is true,
     * it means more results are available.
     *
     * @returns {boolean} True if a next page exists; false otherwise.
     */
    public hasNextPage(): boolean {
        return this.response.result['page']['has_next'];
    }

    /**
     * Retrieves the next page of search results.
     *
     * This method uses the `hasNextPage()` function to check if there is a subsequent page.
     * If a next page is available, it updates the current page cursor to the next page,
     * re-executes the search query by calling the `get()` method, and returns the updated instance.
     * If no next page exists, the method returns null.
     *
     * @returns {Promise<this | null>} The current instance with updated results if a next page is available; otherwise, null.
     */
    public async next(): Promise<this | null> {
        if (this.hasNextPage()) {
            this.setAfter(this.response.result['page']['after']);
            await this.get();
            return this;
        }
        return null;
    }

    /**
     * Resets the pagination and retrieves the first set of recommendations.
     *
     * @returns {Promise<this>} Returns the current instance with the initial recommendations.
     */
    public async first(): Promise<this> {
        this.setAfter("");
        await this.get();
        return this;
    }
}

export default DiscoverAction;
