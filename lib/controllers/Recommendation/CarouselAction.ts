// CarouselAction.ts

import {Action} from '../../Action';
import RecommendationCarouselModel from '../../models/RecommendationCarouselModel';

/**
 * CarouselAction class
 *
 * This action handles retrieving carousel-style recommendations.
 * It builds the API request URL using various parameters (user, category, brand, segments)
 * and processes the response to create a RecommendationCarouselModel.
 */
class CarouselAction extends Action {
    /**
     * User identifier for the recommendation request.
     */
    public user_id: string = "";

    /**
     * Category identifier used for filtering recommendations.
     */
    public category_id: number = 0;

    /**
     * Remote key associated with the category.
     */
    public category_remote_key: string = "";

    /**
     * Brand identifier used for filtering recommendations.
     */
    public brand_id: number = 0;

    /**
     * Remote key associated with the brand.
     */
    public brand_remote_key: string = "";

    /**
     * Name of the brand.
     */
    public brand_name: string = "";

    /**
     * Segments parameter to refine the recommendation query.
     */
    public segments: string = "";

    /**
     * Negative segments parameter to exclude certain recommendations.
     */
    public negative_segments: string = "";

    /**
     * The recommendation carousel model that will store the API response data.
     */
    public model: RecommendationCarouselModel | null = null;

    // ***********************
    // Getter and Setter Methods
    // ***********************

    public getUserId(): string {
        return this.user_id;
    }

    public setUserId(user_id: string): CarouselAction {
        this.user_id = user_id;
        return this;
    }

    public getSegments(): string {
        return this.segments;
    }

    public setSegments(segments: string): CarouselAction {
        this.segments = segments;
        return this;
    }

    public getNegativeSegments(): string {
        return this.negative_segments;
    }

    public setNegativeSegments(negative_segments: string): CarouselAction {
        this.negative_segments = negative_segments;
        return this;
    }

    public getCategoryId(): number {
        return this.category_id;
    }

    public setCategoryId(category_id: number): CarouselAction {
        this.category_id = category_id;
        return this;
    }

    public getCategoryRemoteKey(): string {
        return this.category_remote_key;
    }

    public setCategoryRemoteKey(category_remote_key: string): CarouselAction {
        this.category_remote_key = category_remote_key;
        return this;
    }

    public getBrandId(): number {
        return this.brand_id;
    }

    public setBrandId(brand_id: number): CarouselAction {
        this.brand_id = brand_id;
        return this;
    }

    public getBrandRemoteKey(): string {
        return this.brand_remote_key;
    }

    public setBrandRemoteKey(brand_remote_key: string): CarouselAction {
        this.brand_remote_key = brand_remote_key;
        return this;
    }

    public getBrandName(): string {
        return this.brand_name;
    }

    public setBrandName(brand_name: string): CarouselAction {
        this.brand_name = brand_name;
        return this;
    }

    public getModel(): RecommendationCarouselModel | null {
        return this.model;
    }

    public setModel(model: RecommendationCarouselModel | null): CarouselAction {
        this.model = model;
        return this;
    }

    // ***********************
    // Core Methods
    // ***********************

    /**
     * Builds the API request URL for the recommendation carousel.
     *
     * This method converts action parameters to an array,
     * builds a query string from them, and appends it to the base URL.
     *
     * @returns {string} The full API endpoint URL.
     */
    public buildUrl(): string {
        const params = this.paramsToArray();
        const queryString = new URLSearchParams(params).toString();
        return this.controller.base() + "/recommendation/carousel?" + queryString;
    }

    /**
     * Executes the recommendation carousel action.
     *
     * Sends the API request using the built URL, then processes the response.
     * If the response is successful (HTTP 200), a RecommendationCarouselModel is instantiated.
     *
     * @returns {Promise<this>} The current action instance with the model populated if successful.
     */
    public async get(): Promise<this> {
        this.response = await this.request(this.buildUrl());

        if (this.response.code === 200) {
            const response = this.response.result;
            this.model = new RecommendationCarouselModel(
                response['attributes'],
                response['attribute_parents'],
                response['products'],
                response['personalized']
            );
        } else {
            this.model = null;
        }

        return this;
    }

    /**
     * Converts the current action parameters into an associative array.
     *
     * Only non-empty parameters are included in the array.
     *
     * @returns {Record<string, any>} The parameters for the API request.
     */
    public paramsToArray(): Record<string, any> {
        const params: Record<string, any> = {
            'client-token': this.controller.client_token,
            'user_id': this.user_id,
        };

        if (this.segments) {
            params['segments'] = this.segments;
        }
        if (this.negative_segments) {
            params['negative_segments'] = this.negative_segments;
        }
        if (this.category_id) {
            params['category_id'] = this.category_id;
        }
        if (this.category_remote_key) {
            params['category_remote_key'] = this.category_remote_key;
        }
        if (this.brand_id) {
            params['brand_id'] = this.brand_id;
        }
        if (this.brand_remote_key) {
            params['brand_remote_key'] = this.brand_remote_key;
        }
        if (this.brand_name) {
            params['brand_name'] = this.brand_name;
        }

        return params;
    }
}

export default CarouselAction;
