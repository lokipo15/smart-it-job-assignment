import { User } from "../types/User";
import { UsersState } from "../types/UsersState";

/**
 * Applies filters to an array of User objects.
 * 
 * @param {User[]} users - The array of User objects to be filtered.
 * @param {UsersState['filters']} filters - An object containing filter criteria for user properties.
 * 
 * @returns {User[]} A new array containing the filtered User objects.
 * 
 * @description
 * This function filters an array of User objects based on the provided filter criteria.
 * It checks each user against all specified filters, returning true if the user matches all criteria.
 * The filtering is case-insensitive and uses partial matching (includes).
 * 
 * @example
 * const users = [
 *   { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
 *   { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' }
 * ];
 * const filters = { name: 'john', email: 'example' };
 * const filteredUsers = applyFilters(users, filters);
 * // filteredUsers will contain only the user with name 'John Doe'
 */


export default function applyFilters(users: User[], filters: UsersState['filters']) {
    return users.filter((user) => {
      return Object.entries(filters).every(([key, filterValue]) => {
        if (!filterValue) return true;
        const userValue = user[key as keyof User]?.toString().toLowerCase();
        return userValue?.includes(filterValue);
      });
    });
  };