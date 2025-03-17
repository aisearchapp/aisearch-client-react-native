import Aisearch from '../lib/Aisearch'; // Adjust the path as needed

async function executeRecommendation() {
    const siteId = 1234;
    const clientToken = 'YOUR_CLIENT_TOKEN';

    // Initialize the SDK.
    const sdk = new Aisearch(siteId, clientToken);

    // Get the recommendation controller and use the carousel action.
    const recommendationController = sdk.recommendation();
    const carouselAction = recommendationController.carousel();

    // Set necessary parameters.
    carouselAction.setUserId('user123');
    // Optionally, set more parameters like category or brand filters here.

    try {
        // Execute the recommendation query.
        await carouselAction.get();

        // Display the recommendation results.
        if (carouselAction.model !== null) {
            console.log("Is Recommendation Personalized? " + (carouselAction.model.personalized ? "Yes" : "No"));
            carouselAction.model.products.forEach((product) => {
                console.log("Recommended Product: " + product.name);
            });
        } else {
            console.log("Recommendation query failed.");
        }
    } catch (error) {
        console.error("Error executing recommendation query:", error);
    }
}

// Run the recommendation query.
executeRecommendation();
