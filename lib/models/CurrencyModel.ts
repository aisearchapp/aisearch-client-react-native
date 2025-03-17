/**
 * CurrencyModel
 *
 * This model represents currency configuration data.
 * It contains various properties such as the currency code, formatting details, exchange rate,
 * and other flags that control how the currency is displayed.
 */
class CurrencyModel {
    public currency_code: string;
    public decimal_point: string;
    public thousands_separator: string;
    public symbol: string;
    public exchange_rate: number;
    public symbol_position: number;
    public remove_decimal_zero: boolean;
    public is_active: boolean;

    /**
     * Constructor for the CurrencyModel.
     *
     * Initializes the currency model with the provided configuration data.
     *
     * @param currency_code - The ISO currency code (e.g., USD, EUR).
     * @param decimal_point - The character used as the decimal point in currency formatting.
     * @param thousands_separator - The character used as the thousands separator in currency formatting.
     * @param symbol - The symbol representing the currency (e.g., $, €).
     * @param exchange_rate - The exchange rate of the currency relative to a base currency.
     * @param symbol_position - The position of the currency symbol relative to the amount.
     * @param remove_decimal_zero - Whether to remove unnecessary trailing zeros after the decimal point.
     * @param is_active - Whether the currency is active.
     */
    constructor(
        currency_code: string,
        decimal_point: string,
        thousands_separator: string,
        symbol: string,
        exchange_rate: number,
        symbol_position: number,
        remove_decimal_zero: boolean,
        is_active: boolean
    ) {
        this.currency_code = currency_code;
        this.decimal_point = decimal_point;
        this.thousands_separator = thousands_separator;
        this.symbol = symbol;
        this.exchange_rate = exchange_rate;
        this.symbol_position = symbol_position;
        this.remove_decimal_zero = remove_decimal_zero;
        this.is_active = is_active;
    }
}

export default CurrencyModel;
