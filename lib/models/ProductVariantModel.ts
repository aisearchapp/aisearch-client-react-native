/**
 * ProductVariantModel
 *
 * This model represents a variant of a product.
 * A product variant can differ in attributes such as price, stock, SKU, and other custom data.
 */
class ProductVariantModel {
    public name: string;
    public stock: number;
    public base_price: number;
    public price: number;
    public sku: string;
    public master_key: string;
    public custom: any;
    public attributes: any[];

    /**
     * Constructor for the ProductVariantModel.
     *
     * Initializes the product variant with the provided values.
     *
     * @param name - The name of the variant.
     * @param stock - The available stock for the variant.
     * @param base_price - The base price of the variant.
     * @param price - The current price of the variant.
     * @param sku - The SKU for the variant.
     * @param master_key - The master key for the variant.
     * @param custom - Custom data associated with the variant.
     * @param attributes - An array of attributes for the variant.
     */
    constructor(
        name: string,
        stock: number,
        base_price: number,
        price: number,
        sku: string,
        master_key: string,
        custom: any,
        attributes: any[]
    ) {
        this.name = name;
        this.stock = stock;
        this.base_price = base_price;
        this.price = price;
        this.sku = sku;
        this.master_key = master_key;
        this.custom = custom;
        this.attributes = attributes;
    }
}

export default ProductVariantModel;
