import AttributeParentModel from './AttributeParentModel';
import AttributeChildModel from './AttributeChildModel';
import SearchRecommendationInterestModel from './SearchRecommendationInterestModel';
import SearchRecommendationPopularModel from './SearchRecommendationPopularModel';
import SearchRecommendationCtaModel from './SearchRecommendationCtaModel';

/**
 * SearchRecommendationModel
 *
 * This model represents the result of a search recommendation.
 * It encapsulates various pieces of data returned from the API including:
 * - An array of parent attribute models used for recommendations.
 * - An array of child attribute models.
 * - An interest model containing clicked products and additional recommended products.
 * - A popular model containing popular search data.
 * - A CTA (Call-To-Action) model for recommendation messages.
 * - An array of recent search queries.
 *
 * The constructor processes raw arrays from the API response and converts them into their respective model instances.
 *
 * @param attribute_parents - Raw array of parent attribute data.
 * @param attributes - Raw array of child attribute data.
 * @param interests - An instance of SearchRecommendationInterestModel.
 * @param popular - An instance of SearchRecommendationPopularModel.
 * @param cta - An instance of SearchRecommendationCtaModel.
 * @param recent - Array of recent search queries.
 */
class SearchRecommendationModel {
    public attribute_parents: AttributeParentModel[];
    public attributes: AttributeChildModel[];
    public interests: SearchRecommendationInterestModel;
    public popular: SearchRecommendationPopularModel;
    public cta: SearchRecommendationCtaModel;
    public recent: any[];

    constructor(
        attribute_parents: any[],
        attributes: any[],
        interests: SearchRecommendationInterestModel,
        popular: SearchRecommendationPopularModel,
        cta: SearchRecommendationCtaModel,
        recent: any[]
    ) {
        // Process each raw parent attribute data into an AttributeParentModel instance.
        for (let i = 0; i < attribute_parents.length; i++) {
            const ap = attribute_parents[i];
            attribute_parents[i] = new AttributeParentModel(
                Number(ap.id),
                Number(ap.group_id),
                Number(ap.position),
                String(ap.name),
                String(ap.regular_name),
                String(ap.filter_label),
                String(ap.filter_type),
                String(ap.remote_key),
                Boolean(ap.show_in_full_search),
                Boolean(ap.show_in_recommendation),
                String(ap.recommendation_title),
                Boolean(ap.is_option),
                String(ap.created_at),
                String(ap.updated_at)
            );
        }

        // Process each raw child attribute data into an AttributeChildModel instance.
        for (let i = 0; i < attributes.length; i++) {
            const attr = attributes[i];
            attributes[i] = new AttributeChildModel(
                Number(attr.id),
                Number(attr.parent_id),
                Number(attr.group_id),
                Number(attr.position),
                String(attr.name),
                String(attr.regular_name),
                String(attr.filter_label),
                String(attr.color_code),
                String(attr.remote_key),
                String(attr.created_at),
                String(attr.updated_at)
            );
        }

        this.attribute_parents = attribute_parents;
        this.attributes = attributes;
        this.interests = interests;
        this.popular = popular;
        this.cta = cta;
        this.recent = recent;
    }
}

export default SearchRecommendationModel;
