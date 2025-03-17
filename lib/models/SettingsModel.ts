import SettingsCtaModel from './SettingsCtaModel';
import CurrencyModel from './CurrencyModel';
import SettingsSubscriptionModel from './SettingsSubscriptionModel';

/**
 * SettingsModel
 *
 * This model encapsulates configuration settings for the Aisearch SDK.
 * It contains general settings such as the system status, language identifier,
 * CTA (Call-To-Action) settings, available currencies, and subscription details.
 *
 * The constructor processes raw currency data by converting each currency object
 * into a CurrencyModel instance.
 */
class SettingsModel {
    public status: boolean;
    public language_id: string;
    public cta: SettingsCtaModel;
    public currencies: CurrencyModel[];
    public subscription: SettingsSubscriptionModel;

    /**
     * Constructor for SettingsModel.
     *
     * Processes the raw currency data and initializes the settings model with the provided values.
     *
     * @param status - The status of the settings.
     * @param language_id - The language identifier.
     * @param cta - The CTA settings.
     * @param currencies - Raw currency data, each element is an associative object.
     * @param subscription - The subscription settings.
     */
    constructor(
        status: boolean,
        language_id: string,
        cta: SettingsCtaModel,
        currencies: any[],
        subscription: SettingsSubscriptionModel
    ) {
        // Process raw currency data: Convert each raw currency object into a CurrencyModel instance.
        for (let i = 0; i < currencies.length; i++) {
            const currency = currencies[i];
            currencies[i] = new CurrencyModel(
                currency.currency_code,
                currency.decimal_point,
                currency.thousands_separator,
                currency.symbol,
                currency.exchange_rate,
                currency.symbol_position,
                Boolean(currency.remove_decimal_zero),
                Boolean(currency.is_active)
            );
        }

        // Initialize class properties with processed data.
        this.status = status;
        this.language_id = language_id;
        this.cta = cta;
        this.currencies = currencies;
        this.subscription = subscription;
    }
}

export default SettingsModel;
