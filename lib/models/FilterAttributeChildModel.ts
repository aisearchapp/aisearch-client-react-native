/**
 * FilterAttributeChildModel
 *
 * This model represents a child attribute used for filtering purposes.
 * It includes details such as the attribute's identifier, its parent relationship,
 * grouping information, display position, naming details, label for filtering,
 * associated color code, and the count of items associated with this attribute.
 */
class FilterAttributeChildModel {
    public id: number;
    public parent_id: number;
    public group_id: number;
    public position: number;
    public name: string;
    public filter_label: string;
    public color_code: string;
    public count: number;

    /**
     * Constructor for the FilterAttributeChildModel.
     *
     * Initializes the filter attribute child with the provided values.
     *
     * @param id - The unique identifier of the attribute.
     * @param parent_id - The identifier of the parent attribute.
     * @param group_id - The group identifier to which this attribute belongs.
     * @param position - The display order position of the attribute.
     * @param name - The name of the attribute.
     * @param filter_label - The label used for filtering.
     * @param color_code - The color code for UI display.
     * @param count - The count of items associated with this attribute.
     */
    constructor(
        id: number,
        parent_id: number,
        group_id: number,
        position: number,
        name: string,
        filter_label: string,
        color_code: string,
        count: number
    ) {
        this.id = id;
        this.parent_id = parent_id;
        this.group_id = group_id;
        this.position = position;
        this.name = name;
        this.filter_label = filter_label;
        this.color_code = color_code;
        this.count = count;
    }
}

export default FilterAttributeChildModel;
