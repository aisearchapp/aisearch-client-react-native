/**
 * RecommendationRelatingPageRedirectModel
 *
 * This model represents a page redirect configuration for recommendation pages.
 * It holds details such as the redirect's unique ID, name, target URL, whether it should
 * automatically redirect, its display order, type, additional details, and timestamps for creation and updates.
 */
class RecommendationRelatingPageRedirectModel {
    public id: number;
    public name: string;
    public url: string;
    public auto_redirect: boolean;
    public position: number;
    public type: string;
    public detail: any;
    public created_at: string;
    public updated_at: string;

    /**
     * Constructor for RecommendationRelatingPageRedirectModel.
     *
     * @param id - The unique identifier for the redirect.
     * @param name - The name of the redirect.
     * @param url - The target URL for the redirect.
     * @param auto_redirect - Whether the redirect should happen automatically.
     * @param position - The display order position of the redirect.
     * @param type - The type of the redirect.
     * @param detail - Additional details for the redirect.
     * @param created_at - The creation timestamp.
     * @param updated_at - The last update timestamp.
     */
    constructor(
        id: number,
        name: string,
        url: string,
        auto_redirect: boolean,
        position: number,
        type: string,
        detail: any,
        created_at: string,
        updated_at: string
    ) {
        this.id = id;
        this.name = name;
        this.url = url;
        this.auto_redirect = auto_redirect;
        this.position = position;
        this.type = type;
        this.detail = detail;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

export default RecommendationRelatingPageRedirectModel;
