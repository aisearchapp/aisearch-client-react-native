import FilterAttributeChildModel from './FilterAttributeChildModel';

/**
 * FilterAttributeParentModel
 *
 * This model represents a parent attribute used for filtering.
 * It encapsulates key details of the parent attribute and includes an array
 * of its child attributes as instances of FilterAttributeChildModel.
 */
class FilterAttributeParentModel {
    public id: number;
    public name: string;
    public filter_label: string;
    public filter_type: string;
    public show_in_full_search: boolean;
    public show_in_recommendation: boolean;
    public recommendation_title: string;
    public is_option: boolean;
    public children: FilterAttributeChildModel[];

    /**
     * Constructor for FilterAttributeParentModel.
     *
     * Initializes the parent attribute with the provided values and converts the raw children data
     * into an array of FilterAttributeChildModel instances.
     *
     * @param id - Unique identifier for the parent attribute.
     * @param name - Name of the attribute.
     * @param filter_label - Filter label used for display purposes.
     * @param filter_type - Type of filter applied.
     * @param show_in_full_search - Indicates if the attribute is visible in full search.
     * @param show_in_recommendation - Indicates if the attribute is visible in recommendations.
     * @param recommendation_title - Title to be used in recommendation displays.
     * @param is_option - Indicates if the attribute is an option.
     * @param children - An array of raw objects representing child attributes.
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
        // Convert each raw child attribute into a FilterAttributeChildModel instance.
        this.children = children.map(child =>
            new FilterAttributeChildModel(
                child.id,
                child.parent_id,
                child.group_id,
                child.position,
                child.name,
                child.filter_label,
                child.color_code,
                Number(child.count)
            )
        );
        // Initialize parent attribute properties.
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

export default FilterAttributeParentModel;
