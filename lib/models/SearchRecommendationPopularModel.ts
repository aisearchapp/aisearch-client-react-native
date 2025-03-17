import PopularCategoryModel from './PopularCategoryModel';
import ProductModel from './ProductModel';

/**
 * SearchRecommendationPopularModel
 *
 * This model encapsulates popular recommendation data returned from the API.
 * It holds:
 * - An array of popular search terms.
 * - An array of PopularCategoryModel instances representing popular categories.
 * - An array of ProductModel instances representing popular products.
 *
 * The constructor processes raw arrays for categories and products, converting them into their
 * respective model instances.
 *
 * @param searches - Raw array of popular search terms.
 * @param categories - Raw array of category data.
 * @param products - Raw array of product data.
 */
class SearchRecommendationPopularModel {
    public searches: any[];
    public categories: PopularCategoryModel[];
    public products: ProductModel[];

    constructor(
        searches: any[],
        categories: any[],
        products: any[]
    ) {
        // Process raw category data into PopularCategoryModel instances.
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            categories[i] = new PopularCategoryModel(
                Number(category.id),
                String(category.name),
                String(category.image_url),
                String(category.url),
                category.custom,
                Number(category.position),
                String(category.created_at),
                String(category.updated_at)
            );
        }

        // Process raw product data into ProductModel instances.
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            products[i] = new ProductModel(
                Number(product.id),
                String(product.name),
                Array.isArray(product.images) ? product.images : [],
                String(product.url),
                Number(product.stock),
                Boolean(product.is_new),
                parseFloat(product.buying_price),
                parseFloat(product.price),
                String(product.currency_code),
                Number(product.category_id),
                Number(product.brand_id),
                String(product.sku),
                String(product.master_key),
                String(product.barcode),
                product.custom,
                Array.isArray(product.attributes) ? product.attributes : [],
                Array.isArray(product.variants) ? product.variants : [],
                String(product.brand)
            );
        }

        this.searches = searches;
        this.categories = categories;
        this.products = products;
    }
}

export default SearchRecommendationPopularModel;
