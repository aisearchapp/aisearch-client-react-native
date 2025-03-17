import ProductVariantModel from './ProductVariantModel';
import ProductModel from './ProductModel';
import AttributeParentModel from './AttributeParentModel';
import AttributeChildModel from './AttributeChildModel';

/**
 * RecommendationCarouselModel
 *
 * This model encapsulates data for a recommendation carousel.
 * It converts raw API response data into structured model instances for:
 * - Child attributes (using AttributeChildModel)
 * - Parent attributes (using AttributeParentModel)
 * - Products (using ProductModel and ProductVariantModel for variants)
 *
 * Additionally, it holds a flag indicating whether the recommendations are personalized.
 */
class RecommendationCarouselModel {
    public attributes: AttributeChildModel[];
    public attribute_parents: AttributeParentModel[];
    public products: ProductModel[];
    public personalized: boolean;

    /**
     * @param attributes - Raw data for child attributes.
     * @param attribute_parents - Raw data for parent attributes.
     * @param products - Raw data for products.
     * @param personalized - Whether the recommendations are personalized.
     */
    constructor(
        attributes: any[],
        attribute_parents: any[],
        products: any[],
        personalized: boolean
    ) {
        // Process products: convert raw variant arrays into ProductVariantModel instances,
        // then convert the entire product array into a ProductModel instance.
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            for (let j = 0; j < product.variants.length; j++) {
                const variant = product.variants[j];
                product.variants[j] = new ProductVariantModel(
                    variant.name,
                    variant.stock,
                    parseFloat(variant.buying_price),
                    parseFloat(variant.price),
                    variant.sku,
                    variant.master_key,
                    variant.custom,
                    variant.attributes
                );
            }
            products[i] = new ProductModel(
                product.id,
                product.name,
                product.images,
                product.url,
                product.stock,
                Boolean(product.is_new),
                parseFloat(product.buying_price),
                parseFloat(product.price),
                product.currency_code,
                product.category_id,
                product.brand_id,
                product.sku,
                product.master_key,
                product.barcode,
                product.custom,
                product.attributes,
                product.variants,
                product.brand
            );
        }

        // Process attribute parents: convert each raw parent attribute into an AttributeParentModel instance.
        for (let i = 0; i < attribute_parents.length; i++) {
            const ap = attribute_parents[i];
            attribute_parents[i] = new AttributeParentModel(
                ap.id,
                ap.group_id,
                ap.position,
                ap.name,
                ap.regular_name,
                ap.filter_label,
                ap.filter_type,
                ap.remote_key,
                Boolean(ap.show_in_full_search),
                Boolean(ap.show_in_recommendation),
                ap.recommendation_title,
                Boolean(ap.is_option),
                ap.created_at,
                ap.updated_at
            );
        }

        // Process child attributes: convert each raw attribute into an AttributeChildModel instance.
        for (let i = 0; i < attributes.length; i++) {
            const attr = attributes[i];
            attributes[i] = new AttributeChildModel(
                attr.id,
                attr.parent_id,
                attr.group_id,
                attr.position,
                attr.name,
                attr.regular_name,
                attr.filter_label,
                attr.color_code,
                attr.remote_key,
                attr.created_at,
                attr.updated_at
            );
        }

        this.attributes = attributes;
        this.attribute_parents = attribute_parents;
        this.products = products;
        this.personalized = personalized;
    }
}

export default RecommendationCarouselModel;
