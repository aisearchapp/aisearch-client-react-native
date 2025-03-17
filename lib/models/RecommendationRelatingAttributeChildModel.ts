/**
 * RecommendationRelatingAttributeChildModel
 *
 * This model represents a child attribute in the context of recommendation-related data.
 * It stores essential details such as the unique identifier, its parent association,
 * grouping, display position, name, filter label, and associated color code.
 */
class RecommendationRelatingAttributeChildModel {
    public id: number;
    public parent_id: number;
    public group_id: number;
    public position: number;
    public name: string;
    public filter_label: string;
    public color_code: string;

    /**
     * Constructor for RecommendationRelatingAttributeChildModel.
     *
     * @param id - The unique identifier of the child attribute.
     * @param parent_id - The identifier of the parent attribute.
     * @param group_id - The group identifier for the attribute.
     * @param position - The display order position.
     * @param name - The name of the attribute.
     * @param filter_label - The label used for filtering.
     * @param color_code - The color code associated with the attribute.
     */
    constructor(
        id: number,
        parent_id: number,
        group_id: number,
        position: number,
        name: string,
        filter_label: string,
        color_code: string
    ) {
        this.id = id;
        this.parent_id = parent_id;
        this.group_id = group_id;
        this.position = position;
        this.name = name;
        this.filter_label = filter_label;
        this.color_code = color_code;
    }
}

export default RecommendationRelatingAttributeChildModel;
