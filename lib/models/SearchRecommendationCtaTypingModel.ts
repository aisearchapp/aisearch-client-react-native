/**
 * SearchRecommendationCtaTypingModel
 *
 * This model represents a single Call-to-Action (CTA) typing element used in recommendations.
 * It stores an identifier and a message that can be used to display a CTA in the recommendation interface.
 */
class SearchRecommendationCtaTypingModel {
    public id: number;
    public message: string;

    /**
     * Constructor for SearchRecommendationCtaTypingModel.
     *
     * Initializes the CTA typing model with the provided ID and message.
     *
     * @param id - The unique identifier for the CTA typing element.
     * @param message - The message content for the CTA typing element.
     */
    constructor(id: number, message: string) {
        this.id = id;
        this.message = message;
    }
}

export default SearchRecommendationCtaTypingModel;
