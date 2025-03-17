import SearchRecommendationCtaTypingModel from './SearchRecommendationCtaTypingModel';

/**
 * SearchRecommendationCtaModel
 *
 * This model encapsulates Call-to-Action (CTA) data for recommendations.
 * It processes an array of raw CTA typing data into an array of
 * SearchRecommendationCtaTypingModel instances.
 */
class SearchRecommendationCtaModel {
    public typing: SearchRecommendationCtaTypingModel[];

    /**
     * Constructor for SearchRecommendationCtaModel.
     *
     * Processes the provided raw CTA typing data by converting each
     * element into a SearchRecommendationCtaTypingModel instance.
     *
     * @param typing - Raw array of CTA typing data.
     *                 Each element should contain 'id' and 'message' keys.
     */
    constructor(typing: Array<{ id: number | string; message: string }>) {
        this.typing = typing.map(
            (item) => new SearchRecommendationCtaTypingModel(Number(item.id), item.message)
        );
    }
}

export default SearchRecommendationCtaModel;
