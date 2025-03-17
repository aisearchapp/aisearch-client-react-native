/**
 * FilterPriceModel
 *
 * This model represents a price range filter.
 * It encapsulates a minimum and maximum price, which can be used to filter results based on a price range.
 */
class FilterPriceModel {
    public min: number;
    public max: number;

    /**
     * Constructor for the FilterPriceModel.
     *
     * Initializes the price range with the provided minimum and maximum values.
     *
     * @param min - The minimum price.
     * @param max - The maximum price.
     */
    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }
}

export default FilterPriceModel;
