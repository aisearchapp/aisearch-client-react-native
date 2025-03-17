# Aisearch SDK Integration Guide (TypeScript Version)

## Introduction

The **Aisearch SDK** is a TypeScript library that provides a simple interface to integrate Aisearch’s AI-powered search and recommendation services into your website or application. It allows developers to perform product searches with advanced features (like filtering, sorting, and pagination), retrieve personalized recommendations, and manage user search history. By using the SDK, you can enhance your e-commerce or web application with intelligent search capabilities and AI-driven product discovery without dealing directly with low-level API calls.

In this guide, we will cover how to install and set up the Aisearch SDK, initialize it with your credentials, and use its various components. You’ll learn how to fetch site-specific settings, execute search queries (with examples of filtering, pagination, and sorting), utilize recommendation and discover features for personalized suggestions, manage recent search histories, and follow best practices for error handling. Code snippets are provided throughout to illustrate how to implement each feature using TypeScript.

## Installation

Integrating the Aisearch SDK into your project is straightforward. You can install it via npm:

```bash
npm install aisearch-client-react-native
```

After installation, import the SDK classes in your TypeScript code:

```typescript
import { Aisearch } from 'aisearch-client-react-native';
```

Make sure your project is set up to compile TypeScript (using tsc, webpack, etc.) and that your environment supports fetch (or you have a polyfill) since the SDK uses HTTP requests internally.

## Initialization

Before using any Aisearch features, initialize the SDK with your **Site ID** and **Client Token** (API key). These credentials uniquely identify your website/application and authorize API requests.

```typescript
import { Aisearch } from 'aisearch-client-react-native';

// Your Aisearch credentials (replace with actual values)
const siteId: number = YOUR_SITE_ID;
const clientToken: string = "YOUR_CLIENT_TOKEN";

// Initialize the Aisearch SDK client
const sdk = new Aisearch(siteId, clientToken);
```

Once initialized, the `sdk` instance provides access to various controllers:
- `sdk.search()` – for search queries and related operations.
- `sdk.recommendation()` – for product recommendations and discovery features.
- `sdk.settings()` – to retrieve configuration/settings from Aisearch.
- `sdk.searchRecentQuery()` – to manage recent search queries for a user.

## Fetching Settings

You can fetch site-specific settings such as supported languages, available filters/attributes, currency settings, and custom CTAs. This information can be used to align your application’s UI with your Aisearch configuration.

```typescript
async function fetchSettings() {
  try {
    const settingsAction = await sdk.settings().get();
    if (settingsAction.response.isSuccess()) {
      const settingsModel = settingsAction.model;
      // Example usage:
      const isActive: boolean = settingsModel.status;
      const defaultLang: string = settingsModel.language_id;
      const supportedCurrencies: any[] = settingsModel.currencies;
      console.log("Settings fetched:", settingsModel);
    } else {
      console.error("Failed to fetch settings:", settingsAction.response.error);
    }
  } catch (error) {
    console.error("Error fetching settings:", error);
  }
}

fetchSettings();
```

## Performing Search Queries

The core feature of the Aisearch SDK is executing search queries against your indexed data. You can perform searches with keywords, paginate through results, and refine results using filters and sorting.

### Basic Search Example

```typescript
async function basicSearch() {
  const searchQuery = sdk.search().query();
  searchQuery.setQuery("dress");           // Search keyword
  searchQuery.setUserId("user-123");         // Unique user identifier
  searchQuery.setLimit(30);                  // Number of results per page
  // Assuming the SDK exposes sort constants via the query instance:
  searchQuery.setSort(searchQuery.SORT_DEFAULT);
  searchQuery.setPage(1);                    // Page number

  const resultsAction = await searchQuery.first();
  if (resultsAction.response.isSuccess()) {
    const resultModel = resultsAction.model;
    console.log("Total products found:", resultModel.count);
    resultModel.products.forEach((product: any) => {
      console.log(`${product.name} - ${product.price}`);
    });
  } else {
    console.error("Search failed:", resultsAction.response.error);
  }
}

basicSearch();
```

### Pagination

To retrieve subsequent pages of results:

```typescript
async function paginateSearch() {
  const searchQuery = sdk.search().query();
  searchQuery.setQuery("dress");
  searchQuery.setUserId("user-123");
  searchQuery.setLimit(30);
  searchQuery.setPage(1);

  const firstResults = await searchQuery.first();
  if (firstResults.response.isSuccess()) {
    const nextPageAction = await searchQuery.next();
    if (nextPageAction && nextPageAction.response.isSuccess()) {
      const nextPageModel = nextPageAction.model;
      console.log("Page 2 products:");
      nextPageModel.products.forEach((product: any) => {
        console.log(`- ${product.name}`);
      });
    }
  }
}

paginateSearch();
```

### Applying Filters and Sorting

**Attribute Filters:**

```typescript
const searchQuery = sdk.search().query();
searchQuery.setQuery("dress");

// Filter by Category (parent ID 5, child ID 12)
searchQuery.addFilterAttribute(5, 12);

// Filter by Color (parent ID 10, child ID 22)
searchQuery.addFilterAttribute(10, 22);
```

**Price Filter:**

```typescript
searchQuery.setFilterMinPrice(100.00);  // Minimum price
searchQuery.setFilterMaxPrice(500.00);  // Maximum price
```

**Sorting:**

```typescript
// Set sort to price ascending (assuming SORT_PRICE_ASC constant exists)
searchQuery.setSort(QueryAction.SORT_PRICE_ASC);
```

**Removing Filters:**

```typescript
// Remove a specific filter (e.g., Color = Red)
searchQuery.removeFilterAttribute(10, 22);

// Remove all filters under a specific attribute (e.g., Category)
searchQuery.removeAllFilterAttributes(5);

// Clear all filters
searchQuery.removeAllFilterAttributes();
```

## Recommendations & Discover Features

### Fetching Recommendations

To get personalized product recommendations (e.g., a carousel):

```typescript
async function fetchRecommendations() {
  const recAction = sdk.recommendation().carousel();
  recAction.setUserId("user-123");   // Personalize based on user
  recAction.setCategoryId(5);        // Optional: filter by category

  const recResultsAction = await recAction.get();
  if (recResultsAction.response.isSuccess()) {
    const recModel = recResultsAction.model;
    recModel.products.forEach((product: any) => {
      console.log(`Recommended: ${product.name} - ${product.price}`);
    });
  } else {
    console.error("Recommendation fetch failed:", recResultsAction.response.error);
  }
}

fetchRecommendations();
```

### Using Discover Mode

For AI-driven suggestions when a user hasn’t entered a query:

```typescript
async function fetchDiscoverSuggestions() {
  const discoverAction = sdk.recommendation().discover();
  discoverAction.setUserId("user-123"); // Personalize suggestions
  discoverAction.setLimit(20);          // Number of items to retrieve

  const discoverResults = await discoverAction.first();
  if (discoverResults.response.isSuccess()) {
    const discoverModel = discoverResults.model;
    console.log("Discover suggestions count:", discoverModel.count);
    discoverModel.products.forEach((product: any) => {
      console.log(`Suggestion: ${product.name}`);
    });
  } else {
    console.error("Discover fetch failed:", discoverResults.response.error);
  }
}

fetchDiscoverSuggestions();
```

## Managing User Search History

You can manage user search history, such as deleting a specific search query or clearing all history:

### Deleting a Specific Search Query

```typescript
async function deleteSearchHistory() {
  const historyAction = sdk.searchRecentQuery();
  historyAction.setUserId("user-123");   // Specify the user
  historyAction.setQuery("dress");       // Specify which search term to delete

  const success = await historyAction.delete();
  if (success) {
    console.log("The query 'dress' was removed from user-123's recent searches.");
  } else {
    console.error("Failed to delete recent search:", historyAction.response.error);
  }
}

deleteSearchHistory();
```

### Clearing All Recent Searches

```typescript
async function clearAllSearchHistory() {
  const historyAction = sdk.searchRecentQuery();
  historyAction.setUserId("user-123");
  // No specific query set means clear all history
  const cleared = await historyAction.delete();
  if (cleared) {
    console.log("All recent searches cleared for user-123.");
  } else {
    console.error("Failed to clear search history:", historyAction.response.error);
  }
}

clearAllSearchHistory();
```

## Error Handling & Best Practices

- **Check API Response Status:** Always verify if a request succeeded by inspecting `response.isSuccess()` before using the result.
- **Async/Await & Try/Catch:** Wrap asynchronous SDK calls in try/catch blocks to handle errors gracefully.
- **Consistent User Identifiers:** Use a consistent unique identifier (user ID or session ID) for personalization.
- **Dynamic Facets:** Utilize returned filter facets from search results to dynamically build your UI filters.
- **Pagination Considerations:** When implementing “load more” or pagination, ensure you stop when there are no further pages.
- **Caching:** Consider caching non-personalized data for performance improvements while ensuring personalized responses remain fresh.
- **Resource Cleanup:** Let objects go out of scope when no longer needed to free up memory.

## Complete Sample Use Cases

### Example 1: E-commerce Search Page Integration

Imagine an online store’s search page where users enter queries, apply filters, and sort results.

```typescript
import { Aisearch } from 'aisearch-client-react-native';
import { QueryAction } from 'aisearch-client-react-native/controllers/Search';

// Initialize the SDK
const sdk = new Aisearch(YOUR_SITE_ID, 'YOUR_CLIENT_TOKEN');

async function handleSearch(queryParams: { q: string; category?: number; sort?: string; page?: number }) {
  const { q, category, sort, page = 1 } = queryParams;
  const search = sdk.search().query();
  search.setUserId("current-user-id"); // Use actual user ID or session ID

  if (q) {
    search.setQuery(q);
  }
  search.setLimit(20);
  search.setPage(page);

  // Apply category filter if provided (assuming Category parent attribute ID is 5)
  if (category) {
    search.addFilterAttribute(5, category);
  }

  // Apply sorting based on query parameters
  switch (sort) {
    case 'price_asc':
      search.setSort(QueryAction.SORT_PRICE_ASC);
      break;
    case 'price_desc':
      search.setSort(QueryAction.SORT_PRICE_DESC);
      break;
    case 'name_asc':
      search.setSort(QueryAction.SORT_NAME_ASC);
      break;
    case 'name_desc':
      search.setSort(QueryAction.SORT_NAME_DESC);
      break;
    default:
      search.setSort(QueryAction.SORT_DEFAULT);
  }

  const searchResult = await search.first();
  if (searchResult.response.isSuccess()) {
    const model = searchResult.model;
    // Render search results
    model.products.forEach((prod: any) => {
      console.log(`Product: ${prod.name}, Price: ${prod.price}`);
    });
    // Optionally, implement pagination based on model.page data
  } else {
    console.error("Search API error:", searchResult.response.error);
  }
}

// Example search request
handleSearch({ q: 'dress', category: 12, sort: 'price_asc', page: 1 });
```

### Example 2: API Endpoint for Frontend Integration (Using Express.js)

For a RESTful API that the frontend can call to fetch search results:

```typescript
import express from 'express';
import { Aisearch } from 'aisearch-client-react-native';
import { QueryAction } from 'aisearch-client-react-native/controllers/Search';

const app = express();
app.use(express.json());

const sdk = new Aisearch(YOUR_SITE_ID, 'YOUR_CLIENT_TOKEN');

app.post('/api/search', async (req, res) => {
  const { query, userId, filters, sort } = req.body;
  const search = sdk.search().query();
  search.setUserId(userId || 'default-user');
  if (query) {
    search.setQuery(query);
  }
  search.setLimit(10);

  if (filters) {
    // Assume filters is an object mapping parentId to childId
    Object.entries(filters).forEach(([parentId, childId]) => {
      search.addFilterAttribute(Number(parentId), Number(childId));
    });
  }

  switch (sort) {
    case 'price_asc':
      search.setSort(QueryAction.SORT_PRICE_ASC);
      break;
    case 'price_desc':
      search.setSort(QueryAction.SORT_PRICE_DESC);
      break;
    case 'name_asc':
      search.setSort(QueryAction.SORT_NAME_ASC);
      break;
    case 'name_desc':
      search.setSort(QueryAction.SORT_NAME_DESC);
      break;
    default:
      search.setSort(QueryAction.SORT_DEFAULT);
  }

  const result = await search.first();
  if (result.response.isSuccess()) {
    const model = result.model;
    res.json({
      total: model.count,
      products: model.products,
      filters: model.attribute_parents.map((parent: any) => ({
        id: parent.id,
        name: parent.name,
        values: model.attributes
          .filter((child: any) => child.parent_id === parent.id)
          .map((child: any) => ({
            id: child.id,
            name: child.name,
            count: child.count
          }))
      }))
    });
  } else {
    res.status(500).json({ error: "Search failed", details: result.response.error });
  }
});

app.listen(3000, () => {
  console.log("API server running on port 3000");
});
```

## Conclusion

The Aisearch SDK for TypeScript provides a comprehensive set of tools to implement intelligent search and recommendations in your application. By following this guide, you can:

- Initialize the SDK with proper credentials.
- Fetch site settings to configure your application.
- Perform search queries with filtering, pagination, and sorting.
- Utilize recommendation and discover features to boost user engagement.
- Manage user search histories by deleting specific entries or clearing all history.
- Implement robust error handling and follow best practices for performance and security.

Integrate Aisearch into your application to enhance your users’ search experience and drive intelligent product discovery. Happy coding with Aisearch in TypeScript!