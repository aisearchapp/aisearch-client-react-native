import ProductVariantModel from './ProductVariantModel'; // Adjust the import path as needed

/**
 * ProductModel
 *
 * This model represents a product entity within the Aisearch SDK.
 * It encapsulates various product details including its identifier, name, images, URLs,
 * stock information, pricing, currency, category and brand references, SKU, barcode,
 * custom data, attributes, available variants, and brand name.
 */
class ProductModel {
    public id: number;
    public name: string;
    public images: string[];
    public url: string;
    public stock: number;
    public is_new: boolean;
    public base_price: number;
    public price: number;
    public currency_code: string;
    public category_id: number;
    public brand_id: number;
    public sku: string;
    public master_key: string;
    public barcode: string;
    public custom: any;
    public attributes: any[];
    public variants: ProductVariantModel[];
    public brand: string;

    /**
     * Constructor for the ProductModel.
     *
     * Initializes the product with all required details.
     *
     * @param id - The unique identifier of the product.
     * @param name - The name of the product.
     * @param images - An array of image URLs for the product.
     * @param url - The URL of the product's detail page.
     * @param stock - The available stock count.
     * @param is_new - Indicates if the product is new.
     * @param base_price - The base price of the product.
     * @param price - The current price of the product.
     * @param currency_code - The currency code (e.g., USD, EUR).
     * @param category_id - The category identifier.
     * @param brand_id - The brand identifier.
     * @param sku - The product SKU.
     * @param master_key - The master key for the product.
     * @param barcode - The product barcode.
     * @param custom - Custom data associated with the product.
     * @param attributes - An array of product attributes.
     * @param variants - An array of product variant models.
     * @param brand - The brand name.
     */
    constructor(
        id: number,
        name: string,
        images: string[],
        url: string,
        stock: number,
        is_new: boolean,
        base_price: number,
        price: number,
        currency_code: string,
        category_id: number,
        brand_id: number,
        sku: string,
        master_key: string,
        barcode: string,
        custom: any,
        attributes: any[],
        variants: ProductVariantModel[],
        brand: string
    ) {
        this.id = id;
        this.name = name;
        this.images = images;
        this.url = url;
        this.stock = stock;
        this.is_new = is_new;
        this.base_price = base_price;
        this.price = price;
        this.currency_code = currency_code;
        this.category_id = category_id;
        this.brand_id = brand_id;
        this.sku = sku;
        this.master_key = master_key;
        this.barcode = barcode;
        this.custom = custom;
        this.attributes = attributes;
        this.variants = variants;
        this.brand = brand;
    }
}

export default ProductModel;
