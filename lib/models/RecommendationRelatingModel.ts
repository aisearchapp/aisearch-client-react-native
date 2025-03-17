import RecommendationRelatingAttributeParentModel from './RecommendationRelatingAttributeParentModel';
import RecommendationRelatingPageRedirectModel from './RecommendationRelatingPageRedirectModel';

/**
 * RecommendationRelatingModel
 *
 * This model encapsulates recommendation relating data.
 * It contains:
 * - An array of parent attribute models (RecommendationRelatingAttributeParentModel)
 *   representing the attributes used for recommendations.
 * - An array of page redirect models (RecommendationRelatingPageRedirectModel)
 *   that define redirection behavior for recommendation pages.
 */
class RecommendationRelatingModel {
    public attributes: RecommendationRelatingAttributeParentModel[];
    public page_redirects: RecommendationRelatingPageRedirectModel[];

    /**
     * Constructor for RecommendationRelatingModel.
     *
     * Initializes the model with the given arrays of parent attribute models and page redirect models.
     *
     * @param attributes - Array of parent attribute models.
     * @param page_redirects - Array of page redirect models.
     */
    constructor(
        attributes: RecommendationRelatingAttributeParentModel[],
        page_redirects: RecommendationRelatingPageRedirectModel[]
    ) {
        this.attributes = attributes;
        this.page_redirects = page_redirects;
    }
}

export default RecommendationRelatingModel;
