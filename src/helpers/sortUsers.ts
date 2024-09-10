import { User } from "../types/User";
import { SortOrder } from "../types/UsersState";


/**
 * Sorts an array of User objects based on a specified field and order.
 * 
 * @param {User[]} users - The array of User objects to be sorted.
 * @param {keyof User} field - The field of the User object to sort by.
 * @param {SortOrder} order - The order of sorting ('asc' for ascending, 'desc' for descending, or null).
 * 
 * @returns {void} This function sorts the array in place and doesn't return a value.
 * 
 * @example
 * const users = [
 *   { id: 1, name: 'John', email: 'john@example.com' },
 *   { id: 2, name: 'Alice', email: 'alice@example.com' }
 * ];
 * sortUsers(users, 'name', 'asc');
 * // users is now sorted by name in ascending order
 */

export default function sortUsers(users: User[], field: keyof User, order: SortOrder) {
    users.sort((a, b) => {
        if (a[field] < b[field]) return order === 'asc' ? 1 : -1;
        if (a[field] > b[field]) return order === 'asc' ? -1 : 1;
        return 0;
    });
}