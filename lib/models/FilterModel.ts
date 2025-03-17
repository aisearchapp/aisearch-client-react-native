import FilterAttributeParentModel from './FilterAttributeParentModel';
import FilterPriceModel from './FilterPriceModel';

/**
 * FilterModel
 *
 * This model encapsulates filtering information used within the application.
 * It contains:
 * - An array of parent attribute models representing the available filter options.
 * - An associative array of selected child attribute IDs keyed by parent attribute ID.
 * - A price range filter encapsulated in a FilterPriceModel.
 */
class FilterModel {
    /**
     * An array of FilterAttributeParentModel instances representing the available filter attributes.
     */
    public attributes: FilterAttributeParentModel[];

    /**
     * An associative array of selected attribute IDs.
     * Structure example: { [parent_id: number]: number[] }
     * This property is intended to be private.
     */
    private selected: Record<number, number[]>;

    /**
     * The price range filter represented by a FilterPriceModel.
     */
    public price: FilterPriceModel;

    /**
     * FilterModel constructor.
     *
     * Initializes the filter model with selected attributes, available attributes, and a price range.
     *
     * @param selected - An associative array of selected attribute IDs (e.g., { parent_id: [child_id1, child_id2] }).
     * @param attributes - An array of associative objects representing parent attributes with their children.
     * @param price - An object with keys 'min' and 'max' representing the price range.
     */
    constructor(selected: Record<number, number[]>, attributes: any[], price: { min: number; max: number; }) {
        this.selected = selected;

        // Convert each raw attribute data into a FilterAttributeParentModel instance.
        this.attributes = attributes.map(attribute =>
            new FilterAttributeParentModel(
                attribute.id,
                attribute.name,
                attribute.filter_label,
                attribute.filter_type,
                Boolean(attribute.show_in_full_search),
                Boolean(attribute.show_in_recommendation),
                attribute.recommendation_title,
                Boolean(attribute.is_option),
                attribute.children
            )
        );

        // Initialize the price filter using the provided price range.
        this.price = new FilterPriceModel(price.min, price.max);
    }

    /**
     * Counts the total number of selected child attributes across all parent attributes.
     *
     * @returns The total count of selected child attributes.
     */
    public countSelected(): number {
        return Object.values(this.selected).reduce((total, arr) => total + arr.length, 0);
    }

    /**
     * Checks if a specific child attribute is selected under a given parent attribute.
     *
     * @param parent_id - The ID of the parent attribute.
     * @param child_id - The ID of the child attribute to check.
     * @returns True if the child attribute is selected under the specified parent, false otherwise.
     */
    public isSelected(parent_id: number, child_id: number): boolean {
        return Object.prototype.hasOwnProperty.call(this.selected, parent_id) &&
            this.selected[parent_id].includes(child_id);
    }
}

export default FilterModel;
