// QueryAction.ts

import {Action} from '../../Action';
import SearchQueryModel from '../../models/SearchQueryModel';

/**
 * QueryAction class
 *
 * This action class handles search query requests to the Aisearch API.
 * It builds the request URL based on various search parameters and sends
 * the request to fetch search results. The response is then processed and
 * converted into a SearchQueryModel instance.
 */
class QueryAction extends Action {
    // Search parameters
    public user_id: string = "";
    public query: string = "";
    public limit: number = 30;
    public page: number = 1;
    public sort: string = "";
    // Attributes is an object mapping parent IDs to an array of child IDs.
    public attributes: Record<string, number[]> = {};
    public min_price: number = 0.0;
    public max_price: number = 0.0;
    public segments: string = "";
    public negative_segments: string = "";
    public model: SearchQueryModel | null = null;

    // ***********************
    // Constants for expand options used in the API request.
    // ***********************
    public static EXPAND_PRODUCT: string = 'product';
    public static EXPAND_FILTER: string = 'filter';
    public static EXPAND_POPULAR_CATEGORIES: string = 'popularCategories';
    public static EXPAND_RECOMMENDATION: string = 'recommendation';

    // ***********************
    // Constants for sort options.
    // ***********************
    public static SORT_DEFAULT: string = "";
    public static SORT_PRICE_ASC: string = "price";
    public static SORT_PRICE_DESC: string = "-price";
    public static SORT_NAME_ASC: string = "name";
    public static SORT_NAME_DESC: string = "-name";
    public static SORT_CREATED_AT_ASC: string = "created_at";
    public static SORT_CREATED_AT_DESC: string = "-created_at";

    // Expand options for the API request.
    public expand: string[] = [
        QueryAction.EXPAND_PRODUCT,
        QueryAction.EXPAND_FILTER,
        QueryAction.EXPAND_POPULAR_CATEGORIES,
        QueryAction.EXPAND_RECOMMENDATION,
    ];

    // ***********************
    // Getter and Setter Methods
    // ***********************

    public getUserId(): string {
        return this.user_id;
    }

    public setUserId(user_id: string): QueryAction {
        this.user_id = user_id;
        return this;
    }

    public setSegments(segments: string): QueryAction {
        this.segments = segments;
        return this;
    }

    public setNegativeSegments(negative_segments: string): QueryAction {
        this.negative_segments = negative_segments;
        return this;
    }

    public getQuery(): string {
        return this.query;
    }

    public setQuery(query: string): QueryAction {
        this.query = query;
        return this;
    }

    public getLimit(): number {
        return this.limit;
    }

    public setLimit(limit: number): QueryAction {
        this.limit = limit;
        return this;
    }

    public setFilterMinPrice(min_price: number): QueryAction {
        this.min_price = min_price;
        return this;
    }

    public setFilterMaxPrice(max_price: number): QueryAction {
        this.max_price = max_price;
        return this;
    }

    public getPage(): number {
        return this.page;
    }

    public setPage(page: number): QueryAction {
        this.page = page;
        return this;
    }

    public getSort(): string {
        return this.sort;
    }

    public setSort(sort: string): QueryAction {
        this.sort = sort;
        return this;
    }

    // ***********************
    // Core Methods
    // ***********************

    /**
     * Builds the request URL for the search query.
     *
     * @returns {string} The full API endpoint URL.
     */
    public buildUrl(): string {
        const params = this.paramsToArray();
        const queryString = new URLSearchParams(params).toString();
        return this.controller.base() + "/search/query?" + queryString;
    }

    /**
     * Executes the search query.
     *
     * Sends the API request using the constructed URL. If the response code is 200,
     * it processes the response data into a SearchQueryModel instance.
     * Otherwise, it sets the model to null.
     *
     * @returns {Promise<this>} The current instance, allowing method chaining.
     */
    public async get(): Promise<this> {
        this.response = await this.request(this.buildUrl());

        if (this.response.code === 200) {
            const response = this.response.result;
            this.model = new SearchQueryModel(
                response['status'],
                response['count'],
                response['products'],
                response['page'],
                response['attribute_parents'],
                response['attributes'],
                response['recent'],
                response['query'],
                response['filter'],
                response['popularCategories'],
                response['recommendation']
            );
        } else {
            this.model = null;
        }
        return this;
    }

    /**
     * Adds a filter attribute to the search query.
     *
     * Updates the internal attributes object by adding a child attribute ID
     * under the given parent attribute ID.
     *
     * @param parent_id - The ID of the parent attribute.
     * @param child_id - The ID of the child attribute to add.
     * @returns {QueryAction}
     */
    public addFilterAttribute(parent_id: number, child_id: number): QueryAction {
        if (!this.attributes[parent_id]) {
            this.attributes[parent_id] = [];
        }
        if (!this.attributes[parent_id].includes(child_id)) {
            this.attributes[parent_id].push(child_id);
        }
        return this;
    }

    /**
     * Removes a specific filter attribute from the search query.
     *
     * Deletes the child attribute ID from the specified parent attribute's list.
     * If the parent attribute no longer has any child attributes, it removes the parent key.
     *
     * @param parent_id - The ID of the parent attribute.
     * @param child_id - The ID of the child attribute to remove.
     * @returns {QueryAction}
     */
    public removeFilterAttribute(parent_id: number, child_id: number): QueryAction {
        if (this.attributes[parent_id]) {
            const index = this.attributes[parent_id].indexOf(child_id);
            if (index !== -1) {
                this.attributes[parent_id].splice(index, 1);
            }
            if (this.attributes[parent_id].length === 0) {
                delete this.attributes[parent_id];
            }
        }
        return this;
    }

    /**
     * Removes all filter attributes.
     *
     * If a parent attribute ID is provided, it removes all child attributes for that parent.
     * If no parent attribute is specified, it clears all filter attributes.
     *
     * @param parent_id - The parent attribute ID to clear, or null to clear all.
     * @returns {QueryAction}
     */
    public removeAllFilterAttributes(parent_id: number | null = null): QueryAction {
        if (parent_id !== null) {
            delete this.attributes[parent_id];
        } else {
            this.attributes = {};
        }
        return this;
    }

    /**
     * Converts the current search query parameters into an associative object.
     *
     * Processes filter attributes into a formatted string and combines all parameters
     * including query, user ID, expand options, client token, pagination, sort, and price filters.
     *
     * @returns {Record<string, any>} An associative object of search query parameters.
     */
    public paramsToArray(): Record<string, any> {
        const attrArr: string[] = [];
        for (const [parentId, children] of Object.entries(this.attributes)) {
            attrArr.push(`${parentId}:${children.join(",")}`);
        }
        const params: Record<string, any> = {
            query: this.query,
            user_id: this.user_id,
            expand: this.expand.join(","),
            'client-token': this.controller.client_token,
            limit: this.limit,
            page: this.page,
            sort: this.sort,
            attributes: attrArr.join("|"),
            min_price: this.min_price,
            max_price: this.max_price,
        };
        if (this.segments) {
            params.segments = this.segments;
        }
        if (this.negative_segments) {
            params.negative_segments = this.negative_segments;
        }
        return params;
    }

    /**
     * Determines whether there is a next page of results.
     *
     * Checks the current API response to see if the 'next' value in the 'page' object is greater than 0.
     *
     * @returns {boolean} True if a next page exists; false otherwise.
     */
    public hasNextPage(): boolean {
        return this.response.result['page']['next'] > 0;
    }

    /**
     * Retrieves the next page of search results.
     *
     * If a next page is available, it updates the current page number to the next page,
     * re-executes the search query by calling the get() method, and returns the updated instance.
     * If no next page exists, the method returns null.
     *
     * @returns {Promise<this | null>} The current instance with updated results if a next page is available; otherwise, null.
     */
    public async next(): Promise<this | null> {
        if (this.hasNextPage()) {
            this.page = this.response.result['page']['next'];
            await this.get();
            return this;
        }
        return null;
    }

    /**
     * Resets the search query to the first page and executes the search.
     *
     * @returns {Promise<this>} The current instance after resetting to the first page.
     */
    public async first(): Promise<this> {
        this.page = 1;
        await this.get();
        return this;
    }
}

export default QueryAction;
