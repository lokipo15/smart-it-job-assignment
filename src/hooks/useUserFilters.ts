import { useDispatch, useSelector } from "react-redux";
import { filterUsers, clearFilters } from "../features/users/usersSlice";
import { RootState } from "../store";


/**
 * Custom hook for managing user filters in the application.
 * 
 * This hook provides functionality to filter users, clear filters, and check if any filters are active.
 * It interacts with the Redux store to manage the filter state.
 * 
 * @returns {Object} An object containing the following:
 *   - filters: The current filter state from the Redux store.
 *   - handleFilterChange: A function to update a specific filter field.
 *   - handleClearFilters: A function to clear all filters.
 *   - isAnyFilterActive: A boolean indicating if any filter is currently active.
 * 
 * @example
 * const { filters, handleFilterChange, handleClearFilters, isAnyFilterActive } = useUserFilters();
 * 
 * // Update a filter
 * <input onChange={handleFilterChange('name')} value={filters.name} />
 * 
 * // Clear all filters
 * <button onClick={handleClearFilters}>Clear Filters</button>
 * 
 * // Check if any filter is active
 * {isAnyFilterActive && <p>Filters are active</p>}
 */

export default function useUserFilters() {
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.users.filters);

    const handleFilterChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(filterUsers({ field, value: e.target.value }));
    };

    const handleClearFilters = () => {
        dispatch(clearFilters());
    };

    const isAnyFilterActive = Object.values(filters).some(value => value !== '');

    return { filters, handleFilterChange, handleClearFilters, isAnyFilterActive };
}