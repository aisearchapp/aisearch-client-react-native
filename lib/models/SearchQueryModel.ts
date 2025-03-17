import PopularCategoryModel from './PopularCategoryModel';
import ProductVariantModel from './ProductVariantModel';
import ProductModel from './ProductModel';
import AttributeParentModel from './AttributeParentModel';
import AttributeChildModel from './AttributeChildModel';
import PageModel from './PageModel';
import FilterModel from './FilterModel';
import RecommendationModel from './RecommendationModel';

/**
 * SearchQueryModel
 *
 * This model represents the result of a search query.
 * It encapsulates various pieces of data returned from the API including:
 * - The overall status and count of results.
 * - An array of product models.
 * - Pagination details (if available) as a PageModel instance.
 * - Arrays of attribute parent and child models.
 * - Recent search queries.
 * - The original search query string.
 * - A filter model containing applied filter details.
 * - An array of popular category models.
 * - A recommendation model (if available).
 *
 * The constructor processes raw arrays from the API response and converts them into their respective model instances.
 *
 * @param status - The response status.
 * @param count - The total number of results.
 * @param products - Raw array of products data.
 * @param page - Raw pagination data (or null if not provided).
 * @param attribute_parents - Raw array of parent attribute data.
 * @param attributes - Raw array of child attribute data.
 * @param recent - Array of recent search queries.
 * @param query - The search query string.
 * @param filter - Raw filter data (or null if not provided).
 * @param popular_categories - Raw array of popular category data.
 * @param recommendation - Raw recommendation data (or null if not provided).
 */
class SearchQueryModel {
    public status: string;
    public count: number;
    public products: ProductModel[];
    public page?: PageModel;
    public attribute_parents: AttributeParentModel[];
    public attributes: AttributeChildModel[];
    public recent: any[];
    public query: string;
    public filter?: FilterModel;
    public popular_categories: PopularCategoryModel[];
    public recommendation?: RecommendationModel;

    constructor(
        status: string,
        count: number,
        products: any[],
        page: any,
        attribute_parents: any[],
        attributes: any[],
        recent: any[],
        query: string,
        filter: any,
        popular_categories: any[],
        recommendation: any
    ) {
        // Process raw popular categories data into PopularCategoryModel instances.
        for (let i = 0; i < popular_categories.length; i++) {
            const popularCategory = popular_categories[i];
            popular_categories[i] = new PopularCategoryModel(
                Number(popularCategory.id),
                String(popularCategory.name),
                String(popularCategory.image_url),
                String(popularCategory.url),
                popularCategory.custom,
                Number(popularCategory.position),
                String(popularCategory.created_at),
                String(popularCategory.updated_at)
            );
        }

        // Process raw product data.
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            for (let j = 0; j < product.variants.length; j++) {
                const variant = product.variants[j];
                product.variants[j] = new ProductVariantModel(
                    String(variant.name),
                    Number(variant.stock),
                    parseFloat(variant.buying_price),
                    parseFloat(variant.price),
                    String(variant.sku),
                    String(variant.master_key),
                    variant.custom,
                    variant.attributes
                );
            }
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

        // Process raw parent attribute data into AttributeParentModel instances.
        for (let i = 0; i < attribute_parents.length; i++) {
            const attrParent = attribute_parents[i];
            attribute_parents[i] = new AttributeParentModel(
                Number(attrParent.id),
                Number(attrParent.group_id),
                Number(attrParent.position),
                String(attrParent.name),
                String(attrParent.regular_name),
                String(attrParent.filter_label),
                String(attrParent.filter_type),
                String(attrParent.remote_key),
                Boolean(attrParent.show_in_full_search),
                Boolean(attrParent.show_in_recommendation),
                String(attrParent.recommendation_title),
                Boolean(attrParent.is_option),
                String(attrParent.created_at),
                String(attrParent.updated_at)
            );
        }

        // Process raw child attribute data into AttributeChildModel instances.
        for (let i = 0; i < attributes.length; i++) {
            const attr = attributes[i];
            attributes[i] = new AttributeChildModel(
                Number(attr.id),
                Number(attr.parent_id),
                Number(attr.group_id),
                Number(attr.position),
                String(attr.name),
                String(attr.regular_name),
                String(attr.filter_label),
                String(attr.color_code),
                String(attr.remote_key),
                String(attr.created_at),
                String(attr.updated_at)
            );
        }

        this.status = status;
        this.count = count;
        this.products = products;
        if (page) {
            this.page = new PageModel(Number(page.count), Number(page.next));
        }
        this.attribute_parents = attribute_parents;
        this.attributes = attributes;
        this.recent = recent;
        this.query = query;
        if (filter) {
            this.filter = new FilterModel(filter.selected, filter.attributes, filter.price);
        }
        this.popular_categories = popular_categories;
        if (recommendation) {
            this.recommendation = new RecommendationModel(
                recommendation.relating,
                recommendation.autocomplete
            );
        }
    }
}

export default SearchQueryModel;
