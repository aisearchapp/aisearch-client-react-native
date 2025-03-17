/**
 * PopularCategoryModel
 *
 * This model represents a popular category entity used within the Aisearch platform.
 * It stores details such as the category ID, name, image URL, associated URL, filtering segments,
 * custom settings, display position, and timestamps for creation and updates.
 */
class PopularCategoryModel {
    public id: number;
    public name: string;
    public image_url: string;
    public url: string;
    public custom: string;
    public position: number;
    public created_at: string;
    public updated_at: string;

    /**
     * Constructor for the PopularCategoryModel.
     *
     * Initializes the popular category model with the provided values.
     *
     * @param id - The unique identifier for the category.
     * @param name - The name of the category.
     * @param image_url - The URL of the category image.
     * @param url - The link to the category page.
     * @param custom - Custom settings or additional information.
     * @param position - The display order position of the category.
     * @param created_at - The creation timestamp.
     * @param updated_at - The last update timestamp.
     */
    constructor(
        id: number,
        name: string,
        image_url: string,
        url: string,
        custom: string,
        position: number,
        created_at: string,
        updated_at: string
    ) {
        this.id = id;
        this.name = name;
        this.image_url = image_url;
        this.url = url;
        this.custom = custom;
        this.position = position;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

export default PopularCategoryModel;
