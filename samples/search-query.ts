import Aisearch from '../lib/Aisearch';
import QueryAction from '../lib/controllers/Search/QueryAction';

async function executeSearchQuery() {
    // Initialize the SDK with your site ID and client token.
    const siteId = 1234;
    const clientToken = 'YOUR_CLIENT_TOKEN';
    const sdk = new Aisearch(siteId, clientToken);

    // Get the search controller and create a new query action.
    const queryAction = sdk.search().query();

    // Set search parameters.
    queryAction
        .setUserId('user123')
        .setQuery('laptop')
        .setLimit(20)
        .setPage(1)
        .setSort(QueryAction.SORT_PRICE_ASC)
        .setFilterMinPrice(500.00)
        .setFilterMaxPrice(1500.00)
        // Optionally, add filter attributes (e.g., parent attribute ID 10 with child attribute ID 101).
        .addFilterAttribute(10, 101);

    try {
        // Execute the search query.
        const result = await queryAction.get();

        // Check and display the results.
        if (result.model !== null) {
            console.log("Search Status: " + result.model.status);
            console.log("Total Products Found: " + result.model.count);
            result.model.products.forEach(product => {
                console.log("Product: " + product.name + " - Price: " + product.price);
            });
        } else {
            console.log("Search query failed.");
        }
    } catch (error) {
        console.error("Error executing search query:", error);
    }
}

// Run the search query.
executeSearchQuery();
