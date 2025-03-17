/**
 * AttributeChildModel
 *
 * This model represents a child attribute entity.
 * It stores information about an attribute including its unique ID, its parent relation,
 * grouping details, display position, naming details, filter label, color information,
 * remote key, and timestamps for creation and last update.
 */
class AttributeChildModel {
    public id: number;
    public parent_id: number;
    public group_id: number;
    public position: number;
    public name: string;
    public regular_name: string;
    public filter_label: string;
    public color_code: string;
    public remote_key: string;
    public created_at: string;
    public updated_at: string;

    /**
     * Constructor for the AttributeChildModel.
     *
     * Initializes the attribute properties with the provided values.
     *
     * @param id - The unique identifier of the attribute.
     * @param parent_id - The identifier of the parent attribute.
     * @param group_id - The identifier of the group the attribute belongs to.
     * @param position - The display order of the attribute.
     * @param name - The name of the attribute.
     * @param regular_name - The normalized name of the attribute.
     * @param filter_label - The filter label used for the attribute.
     * @param color_code - The color code associated with the attribute.
     * @param remote_key - The remote key for external reference.
     * @param created_at - The creation timestamp of the attribute.
     * @param updated_at - The last update timestamp of the attribute.
     */
    constructor(
        id: number,
        parent_id: number,
        group_id: number,
        position: number,
        name: string,
        regular_name: string,
        filter_label: string,
        color_code: string,
        remote_key: string,
        created_at: string,
        updated_at: string
    ) {
        this.id = id;
        this.parent_id = parent_id;
        this.group_id = group_id;
        this.position = position;
        this.name = name;
        this.regular_name = regular_name;
        this.filter_label = filter_label;
        this.color_code = color_code;
        this.remote_key = remote_key;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

export default AttributeChildModel;
