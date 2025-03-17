// RecommendationAction.ts

import {Action} from '../../Action';
import SearchRecommendationCtaModel from '../../models/SearchRecommendationCtaModel';
import SearchRecommendationInterestModel from '../../models/SearchRecommendationInterestModel';
import SearchRecommendationModel from '../../models/SearchRecommendationModel';
import SearchRecommendationPopularModel from '../../models/SearchRecommendationPopularModel';

/**
 * RecommendationAction class
 *
 * This action handles the retrieval of search recommendations.
 * It builds the API request URL using the provided parameters (such as user ID, product limit, and segments),
 * sends the request, and processes the response into a SearchRecommendationModel.
 */
class RecommendationAction extends Action {
    public user_id: string = "";
    public product_limit: number = 5;
    public segments: string = "";
    public negative_segments: string = "";
    public model: SearchRecommendationModel | null = null;

    /**
     * Retrieves the current user ID.
     *
     * @returns {string} The user identifier.
     */
    public getUserId(): string {
        return this.user_id;
    }

    /**
     * Sets the user ID.
     *
     * @param user_id - The user identifier.
     * @returns {RecommendationAction}
     */
    public setUserId(user_id: string): RecommendationAction {
        this.user_id = user_id;
        return this;
    }

    /**
     * Sets the segments parameter.
     *
     * @param segments - The segments used for filtering recommendations.
     * @returns {RecommendationAction}
     */
    public setSegments(segments: string): RecommendationAction {
        this.segments = segments;
        return this;
    }

    /**
     * Sets the negative segments parameter.
     *
     * @param negative_segments - The segments used for excluding recommendations.
     * @returns {RecommendationAction}
     */
    public setNegativeSegments(negative_segments: string): RecommendationAction {
        this.negative_segments = negative_segments;
        return this;
    }

    /**
     * Retrieves the product limit.
     *
     * @returns {number} The maximum number of products to retrieve.
     */
    public getProductLimit(): number {
        return this.product_limit;
    }

    /**
     * Sets the product limit.
     *
     * @param product_limit - The maximum number of products.
     * @returns {RecommendationAction}
     */
    public setProductLimit(product_limit: number): RecommendationAction {
        this.product_limit = product_limit;
        return this;
    }

    /**
     * Builds the full API request URL for the search recommendation.
     *
     * It converts the action parameters to an associative object, builds a query string,
     * and appends it to the base URL.
     *
     * @returns {string} The complete API endpoint URL.
     */
    public buildUrl(): string {
        const params = this.paramsToArray();
        const queryString = new URLSearchParams(params).toString();
        return this.controller.base() + "/search/recommendation?" + queryString;
    }

    /**
     * Executes the recommendation action.
     *
     * Sends the API request using the constructed URL and processes the response.
     * If the response code is 200, it instantiates a SearchRecommendationModel using
     * various parts of the response (attribute parents, attributes, interests, popular items,
     * call-to-action, and recent searches).
     * Otherwise, it sets the model to null.
     *
     * @returns {Promise<RecommendationAction>} Returns the current instance.
     */
    public async get(): Promise<RecommendationAction> {
        this.response = await this.request(this.buildUrl());

        if (this.response.code === 200) {
            const response = this.response.result;
            this.model = new SearchRecommendationModel(
                response['attribute_parents'] || [],
                response['attributes'] || [],
                new SearchRecommendationInterestModel(
                    response['interests'] ? response['interests']['clicks'] : undefined,
                    response['interests'] ? response['interests']['products'] : undefined
                ),
                new SearchRecommendationPopularModel(
                    response['popular'] ? response['popular']['searches'] : undefined,
                    response['popular'] ? response['popular']['categories'] : undefined,
                    response['popular'] ? response['popular']['products'] : undefined
                ),
                new SearchRecommendationCtaModel(
                    response['cta'] ? response['cta']['typing'] : undefined
                ),
                response['recent']
            );
        } else {
            this.model = null;
        }

        return this;
    }

    /**
     * Converts the action parameters into an associative object.
     *
     * Only non-empty parameters are included.
     *
     * @returns {Record<string, any>} The parameters for the API request.
     */
    public paramsToArray(): Record<string, any> {
        const params: Record<string, any> = {
            'user_id': this.user_id,
            'client-token': this.controller.client_token,
            'product-limit': this.product_limit,
        };
        if (this.segments) {
            params['segments'] = this.segments;
        }
        if (this.negative_segments) {
            params['negative_segments'] = this.negative_segments;
        }
        return params;
    }
}

export default RecommendationAction;
