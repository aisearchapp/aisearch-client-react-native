/**
 * SettingsSubscriptionModel
 *
 * This model represents the subscription settings for the Aisearch SDK.
 * It currently encapsulates a single setting that determines whether branding should be removed.
 */
class SettingsSubscriptionModel {
    public remove_branding: boolean;

    /**
     * Constructor for SettingsSubscriptionModel.
     *
     * Initializes the subscription model with the provided branding removal setting.
     *
     * @param remove_branding - If true, branding is removed; otherwise, branding is displayed.
     */
    constructor(remove_branding: boolean) {
        this.remove_branding = remove_branding;
    }
}

export default SettingsSubscriptionModel;
