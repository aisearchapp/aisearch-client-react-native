/**
 * AttributeParentModel
 *
 * This model represents a parent attribute entity.
 * It encapsulates various details about a parent attribute, including its grouping,
 * display order, names, filter settings, remote key for external references, and visibility flags.
 * Additionally, it holds metadata such as creation and update timestamps.
 */
class AttributeParentModel {
    public id: number;
    public group_id: number;
    public position: number;
    public name: string;
    public regular_name: string;
    public filter_label: string;
    public filter_type: string;
    public remote_key: string;
    public show_in_full_search: boolean;
    public show_in_recommendation: boolean;
    public recommendation_title: string;
    public is_option: boolean;
    public created_at: string;
    public updated_at: string;

    /**
     * Constructor for the AttributeParentModel.
     *
     * Initializes the parent attribute with the provided values.
     *
     * @param id - The unique identifier of the parent attribute.
     * @param group_id - The identifier of the group the attribute belongs to.
     * @param position - The display order of the attribute.
     * @param name - The name of the attribute.
     * @param regular_name - The normalized name of the attribute.
     * @param filter_label - The label used for filtering.
     * @param filter_type - The type of filter applied.
     * @param remote_key - The remote key for external reference.
     * @param show_in_full_search - Whether to display the attribute in full search.
     * @param show_in_recommendation - Whether to display the attribute in recommendations.
     * @param recommendation_title - The title for recommendations.
     * @param is_option - Indicates if the attribute is an option.
     * @param created_at - The creation timestamp.
     * @param updated_at - The last update timestamp.
     */
    constructor(
        id: number,
        group_id: number,
        position: number,
        name: string,
        regular_name: string,
        filter_label: string,
        filter_type: string,
        remote_key: string,
        show_in_full_search: boolean,
        show_in_recommendation: boolean,
        recommendation_title: string,
        is_option: boolean,
        created_at: string,
        updated_at: string
    ) {
        this.id = id;
        this.group_id = group_id;
        this.position = position;
        this.name = name;
        this.regular_name = regular_name;
        this.filter_label = filter_label;
        this.filter_type = filter_type;
        this.remote_key = remote_key;
        this.show_in_full_search = show_in_full_search;
        this.show_in_recommendation = show_in_recommendation;
        this.recommendation_title = recommendation_title;
        this.is_option = is_option;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

export default AttributeParentModel;
