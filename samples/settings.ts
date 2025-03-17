import Aisearch from '../lib/Aisearch'; // Adjust import path as needed

async function getSettings() {
    const siteId = 1234;
    const clientToken = 'YOUR_CLIENT_TOKEN';

    // Initialize the SDK.
    const sdk = new Aisearch(siteId, clientToken);

    try {
        // Retrieve settings using the settings controller.
        const settingsAction = await sdk.settings().get();

        // Display settings details.
        if (settingsAction.model !== null) {
            console.log("Settings Status: " + (settingsAction.model.status ? "Active" : "Inactive"));
            console.log("Language: " + settingsAction.model.language_id);

            // Display currencies information.
            settingsAction.model.currencies.forEach((currency) => {
                console.log("Currency: " + currency.currency_code + " - Symbol: " + currency.symbol);
            });

            // Display subscription settings.
            console.log("Remove Branding: " + (settingsAction.model.subscription.remove_branding ? "Yes" : "No"));
        } else {
            console.log("Failed to retrieve settings.");
        }
    } catch (error) {
        console.error("Error retrieving settings:", error);
    }
}

// Execute the settings retrieval.
getSettings();
