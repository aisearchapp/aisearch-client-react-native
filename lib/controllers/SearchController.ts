// SearchController.ts

import Controller from '../Controller';
import QueryAction from './Search/QueryAction';
import RecommendationAction from './Search/RecommendationAction';

/**
 * SearchController class
 *
 * This controller manages search-related operations for the Aisearch SDK.
 * It provides factory methods to create actions for search queries and recommendations.
 */
class SearchController extends Controller {
    /**
     * Creates and returns a QueryAction instance.
     *
     * QueryAction is responsible for handling search query requests.
     * It takes the current controller instance as a dependency to inherit common properties.
     *
     * @returns {QueryAction} QueryAction instance.
     */
    query(): QueryAction {
        return new QueryAction(this);
    }

    /**
     * Creates and returns a RecommendationAction instance.
     *
     * RecommendationAction handles the retrieval of search recommendations.
     * It also receives the current controller instance to utilize shared configuration.
     *
     * @returns {RecommendationAction} RecommendationAction instance.
     */
    recommendation(): RecommendationAction {
        return new RecommendationAction(this);
    }
}

export default SearchController;
