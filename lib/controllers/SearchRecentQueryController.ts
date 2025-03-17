// SearchRecentQueryController.ts

import Controller from '../Controller';
import DeleteAction from './SearchRecentQuery/DeleteAction';

/**
 * SearchRecentQueryController class
 *
 * This controller manages operations related to recent search queries.
 * It allows setting the search parameters (user ID and query) and provides a method
 * to delete a recent search query via the DeleteAction.
 */
class SearchRecentQueryController extends Controller {
    // The user identifier associated with the recent search query.
    public user_id!: string;
    // The search query string that was performed.
    public query!: string;

    /**
     * Gets the user ID.
     *
     * @returns {string} The user ID.
     */
    getUserId(): string {
        return this.user_id;
    }

    /**
     * Sets the user ID.
     *
     * @param user_id - The user ID.
     */
    setUserId(user_id: string): void {
        this.user_id = user_id;
    }

    /**
     * Gets the search query.
     *
     * @returns {string} The search query.
     */
    getQuery(): string {
        return this.query;
    }

    /**
     * Sets the search query.
     *
     * @param query - The search query.
     */
    setQuery(query: string): void {
        this.query = query;
    }

    /**
     * Deletes a recent search query.
     *
     * This method instantiates a DeleteAction, sets its required parameters (user_id and query),
     * and then executes the deletion.
     *
     * @returns {boolean} Returns true if the deletion was successful, otherwise false.
     */
    async delete(): Promise<boolean> {
        const action = new DeleteAction(this);
        action.user_id = this.user_id;
        action.query = this.query;
        return await action.delete();
    }
}

export default SearchRecentQueryController;
