import RecommendationRelatingAttributeChildModel from './RecommendationRelatingAttributeChildModel';

/**
 * RecommendationRelatingAttributeParentModel
 *
 * This model represents a parent attribute in the context of recommendations.
 * It holds basic information such as ID, name, filtering details, and flags indicating
 * where the attribute should be displayed. Additionally, it processes and stores an array
 * of child attributes as instances of RecommendationRelatingAttributeChildModel.
 */
class RecommendationRelatingAttributeParentModel {
    public id: number;
    public name: string;
    public filter_label: string;
    public filter_type: string;
    public show_in_full_search: boolean;
    public show_in_recommendation: boolean;
    public recommendation_title: string;
    public is_option: boolean;
    public children: RecommendationRelatingAttributeChildModel[];

    /**
     * Constructor for RecommendationRelatingAttributeParentModel.
     *
     * Processes raw child attribute data and converts each element into a
     * RecommendationRelatingAttributeChildModel instance.
     *
     * @param id - The unique identifier of the parent attribute.
     * @param name - The name of the parent attribute.
     * @param filter_label - The label used for filtering.
     * @param filter_type - The type of filter applied.
     * @param show_in_full_search - Whether the attribute is displayed in full search.
     * @param show_in_recommendation - Whether the attribute is displayed in recommendations.
     * @param recommendation_title - The title used in recommendation displays.
     * @param is_option - Whether the attribute is considered an option.
     * @param children - Raw array of child attribute data.
     */
    constructor(
        id: number,
        name: string,
        filter_label: string,
        filter_type: string,
        show_in_full_search: boolean,
        show_in_recommendation: boolean,
        recommendation_title: string,
        is_option: boolean,
        children: any[]
    ) {
        // Process each raw child attribute data into a structured model instance.
        this.children = children.map(child =>
            new RecommendationRelatingAttributeChildModel(
                child.id,
                child.parent_id,
                child.group_id,
                child.position,
                child.name,
                child.filter_label,
                child.color_code
            )
        );
        // Assign values to the parent attribute properties.
        this.id = id;
        this.name = name;
        this.filter_label = filter_label;
        this.filter_type = filter_type;
        this.show_in_full_search = show_in_full_search;
        this.show_in_recommendation = show_in_recommendation;
        this.recommendation_title = recommendation_title;
        this.is_option = is_option;
    }
}

export default RecommendationRelatingAttributeParentModel;
