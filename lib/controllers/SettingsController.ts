// SettingsController.ts

import Controller from '../Controller';
import IndexAction from './Settings/IndexAction';

/**
 * SettingsController class
 *
 * This controller handles settings-related operations for the Aisearch API.
 * It provides a method to retrieve the settings configuration via the IndexAction.
 */
class SettingsController extends Controller {
    /**
     * Retrieves the settings.
     *
     * This method instantiates an IndexAction object using the current controller instance,
     * executes its get() method to fetch the settings, and returns the IndexAction instance.
     *
     * @returns {IndexAction} The action instance after retrieving the settings.
     */
    async get(): Promise<IndexAction> {
        return await (new IndexAction(this)).get();
    }
}

export default SettingsController;
