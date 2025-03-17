import ProductVariantModel from './ProductVariantModel';
import ProductModel from './ProductModel';
import AttributeParentModel from './AttributeParentModel';
import AttributeChildModel from './AttributeChildModel';
import RecommendationDiscoverPageModel from './RecommendationDiscoverPageModel';

/**
 * RecommendationDiscoverModel
 *
 * This model encapsulates data for discovery-based recommendations.
 * It converts raw API response data into structured model instances for:
 * - Child attributes (using AttributeChildModel)
 * - Parent attributes (using AttributeParentModel)
 * - Products (using ProductModel, which in turn processes variants into ProductVariantModel)
 * Additionally, it stores the total count of recommendations and pagination details.
 *
 * @param attributes - Raw data for child attributes.
 * @param attribute_parents - Raw data for parent attributes.
 * @param products - Raw data for products.
 * @param count - Total number of recommended products.
 * @param page - Raw pagination data (e.g., { limit, count, has_next, after }).
 */
class RecommendationDiscoverModel {
    public attributes: AttributeChildModel[];
    public attribute_parents: AttributeParentModel[];
    public products: ProductModel[];
    public count: number;
    public page: RecommendationDiscoverPageModel;

    constructor(
        attributes: any[],
        attribute_parents: any[],
        products: any[],
        count: number,
        page: any
    ) {
        // Process products: convert raw variant data into ProductVariantModel instances,
        // then create a ProductModel instance for each product.
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

        // Process parent attributes: convert each raw parent attribute into an AttributeParentModel instance.
        for (let i = 0; i < attribute_parents.length; i++) {
            const ap = attribute_parents[i];
            attribute_parents[i] = new AttributeParentModel(
                Number(ap.id),
                Number(ap.group_id),
                Number(ap.position),
                String(ap.name),
                String(ap.regular_name),
                String(ap.filter_label),
                String(ap.filter_type),
                String(ap.remote_key),
                Boolean(ap.show_in_full_search),
                Boolean(ap.show_in_recommendation),
                String(ap.recommendation_title),
                Boolean(ap.is_option),
                String(ap.created_at),
                String(ap.updated_at)
            );
        }

        // Process child attributes: convert each raw attribute into an AttributeChildModel instance.
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

        this.attributes = attributes;
        this.attribute_parents = attribute_parents;
        this.products = products;
        this.count = count;
        this.page = new RecommendationDiscoverPageModel(
            Number(page.limit),
            Number(page.count),
            Boolean(page.has_next),
            String(page.after)
        );
    }
}

export default RecommendationDiscoverModel;
