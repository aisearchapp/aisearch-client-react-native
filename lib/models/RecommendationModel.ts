import RecommendationRelatingModel from './RecommendationRelatingModel';
import RecommendationRelatingAttributeParentModel from './RecommendationRelatingAttributeParentModel';
import RecommendationRelatingPageRedirectModel from './RecommendationRelatingPageRedirectModel';

/**
 * RecommendationModel
 *
 * This model encapsulates recommendation data that is used in the Aisearch SDK.
 * It includes two main parts:
 *  - A "relating" section, which contains attributes and page redirects processed into structured models.
 *  - An "autocomplete" section that holds autocomplete suggestion data.
 */
class RecommendationModel {
    public relating: RecommendationRelatingModel;
    public autocomplete: any[];

    /**
     * @param relating - Raw relating data with keys 'attributes' and 'pageRedirects'.
     * @param autocomplete - Raw autocomplete suggestion data.
     */
    constructor(relating: any, autocomplete: any[]) {
        // Process each raw attribute into a structured model instance.
        for (let i = 0; i < relating.attributes.length; i++) {
            const attribute = relating.attributes[i];
            relating.attributes[i] = new RecommendationRelatingAttributeParentModel(
                attribute.id,
                attribute.name,
                attribute.filter_label,
                attribute.filter_type,
                Boolean(attribute.show_in_full_search),
                Boolean(attribute.show_in_recommendation),
                attribute.recommendation_title,
                Boolean(attribute.is_option),
                attribute.children
            );
        }

        // Process each raw page redirect into a structured model instance.
        for (let i = 0; i < relating.pageRedirects.length; i++) {
            const pageRedirect = relating.pageRedirects[i];
            relating.pageRedirects[i] = new RecommendationRelatingPageRedirectModel(
                pageRedirect.id,
                pageRedirect.name,
                pageRedirect.url,
                pageRedirect.auto_redirect,
                pageRedirect.position,
                pageRedirect.type,
                pageRedirect.detail,
                pageRedirect.created_at,
                pageRedirect.updated_at
            );
        }

        // Initialize the "relating" property using the processed attributes and page redirects.
        this.relating = new RecommendationRelatingModel(relating.attributes, relating.pageRedirects);

        // Assign autocomplete data directly.
        this.autocomplete = autocomplete;
    }
}

export default RecommendationModel;
