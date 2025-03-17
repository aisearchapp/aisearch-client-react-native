/**
 * RecommendationDiscoverPageModel
 *
 * This model represents pagination details for discovery-based recommendations.
 * It contains information about the pagination limit, the total count of items,
 * whether there is a next page available, and a cursor (or identifier) for the next page.
 */
class RecommendationDiscoverPageModel {
    public limit: number;
    public count: number;
    public has_next: boolean;
    public after: string;

    /**
     * Constructor for the RecommendationDiscoverPageModel.
     *
     * Initializes the pagination model with the provided values.
     *
     * @param limit - The maximum number of items per page.
     * @param count - The total number of items in the current page.
     * @param has_next - Whether there is a next page available.
     * @param after - The cursor or identifier for the next page.
     */
    constructor(limit: number, count: number, has_next: boolean, after: string) {
        this.limit = limit;
        this.count = count;
        this.has_next = has_next;
        this.after = after;
    }
}

export default RecommendationDiscoverPageModel;
