// RecommendationController.ts

import Controller from '../Controller';
import CarouselAction from './Recommendation/CarouselAction';
import DiscoverAction from './Recommendation/DiscoverAction';

/**
 * RecommendationController class handles recommendation-related actions in the Aisearch SDK.
 * It provides factory methods to create specific recommendation actions.
 */
class RecommendationController extends Controller {
    /**
     * Creates and returns a new CarouselAction instance.
     *
     * CarouselAction is used to retrieve carousel-style recommendations.
     *
     * @returns {CarouselAction} CarouselAction instance.
     */
    carousel(): CarouselAction {
        return new CarouselAction(this);
    }

    /**
     * Creates and returns a new DiscoverAction instance.
     *
     * DiscoverAction is used to retrieve discovery-based recommendations.
     *
     * @returns {DiscoverAction} DiscoverAction instance.
     */
    discover(): DiscoverAction {
        return new DiscoverAction(this);
    }
}

export default RecommendationController;
