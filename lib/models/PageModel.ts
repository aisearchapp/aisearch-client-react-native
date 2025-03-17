/**
 * PageModel
 *
 * This model represents pagination information for API responses.
 * It includes the total count of items and the next page number.
 */
class PageModel {
    public count: number;
    public next: number;

    /**
     * Constructor for the PageModel.
     *
     * Initializes the pagination model with the given count and next page values.
     *
     * @param count - The total number of items available.
     * @param next - The page number for the next set of results.
     */
    constructor(count: number, next: number) {
        this.count = count;
        this.next = next;
    }
}

export default PageModel;
