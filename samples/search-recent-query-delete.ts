import Aisearch from '../lib/Aisearch'; // Adjust import path as needed

async function deleteRecentSearchQuery() {
    const siteId = 1234;
    const clientToken = 'YOUR_CLIENT_TOKEN';

    // Initialize the SDK.
    const sdk = new Aisearch(siteId, clientToken);

    // Get the search recent query controller.
    const searchRecentQueryController = sdk.searchRecentQuery();

    // Set the user ID and the query to be deleted.
    searchRecentQueryController.setUserId('user123');
    searchRecentQueryController.setQuery('laptop');

    try {
        // Execute the delete action.
        const deleteSuccess = await searchRecentQueryController.delete();

        if (deleteSuccess) {
            console.log("Recent search query deleted successfully.");
        } else {
            console.log("Failed to delete recent search query.");
        }
    } catch (error) {
        console.error("Error deleting recent search query:", error);
    }
}

// Run the delete action.
deleteRecentSearchQuery();
