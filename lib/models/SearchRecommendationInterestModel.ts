import ProductModel from './ProductModel';

/**
 * SearchRecommendationInterestModel
 *
 * This model represents the interest-based recommendation data for a search.
 * It holds two arrays:
 * - 'clicks': an array of products that received clicks.
 * - 'products': an array of recommended product models.
 *
 * The constructor processes raw arrays of product data from the API and converts them into
 * ProductModel instances. The raw data for both 'clicks' and 'products' is expected
 * to be an array of associative objects.
 */
class SearchRecommendationInterestModel {
    public clicks: ProductModel[];
    public products: ProductModel[];

    /**
     * Constructor for SearchRecommendationInterestModel.
     *
     * @param clicks - Raw data for clicked products.
     * @param products - Raw data for recommended products.
     */
    constructor(clicks: any[], products: any[]) {
        // Process the raw data for clicked products.
        for (let i = 0; i < clicks.length; i++) {
            const click = clicks[i];
            clicks[i] = new ProductModel(
                Number(click.id),
                String(click.name),
                Array.isArray(click.images) ? click.images : [],
                String(click.url),
                Number(click.stock),
                Boolean(click.is_new),
                parseFloat(click.buying_price),
                parseFloat(click.price),
                String(click.currency_code),
                Number(click.category_id),
                Number(click.brand_id),
                String(click.sku),
                String(click.master_key),
                String(click.barcode),
                click.custom,
                click.attributes,
                click.variants,
                String(click.brand)
            );
        }

        // Process the raw data for recommended products.
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
                product.attributes,
                product.variants,
                String(product.brand)
            );
        }

        this.clicks = clicks;
        this.products = products;
    }
}

export default SearchRecommendationInterestModel;
