import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchUsers, sortUsersByField } from "../features/users/usersSlice";
import { User } from "../types/User";


/**
 * Custom hook for managing user table data and interactions.
 * 
 * This hook provides functionality for:
 * - Fetching users data from the Redux store
 * - Initializing user data fetch if not already done
 * - Handling sorting of user data
 * 
 * @returns {Object} An object containing:
 *   - filteredUsers: Array of User objects after applying filters
 *   - status: Current status of user data fetching ('uninitialized', 'loading', 'success', 'error')
 *   - error: Error message if user data fetching failed
 *   - sort: Current sorting configuration { field: keyof User | null, order: 'asc' | 'desc' | null }
 *   - handleSort: Function to trigger sorting by a specific field
 * 
 * @example
 * const { filteredUsers, status, error, sort, handleSort } = useUserTable();
 * 
 * // Use filteredUsers to render table data
 * // Use status to show loading state
 * // Use error to display error messages
 * // Use sort to highlight sorted column
 * // Use handleSort to trigger sorting when a column header is clicked
 */

export default function useUserTable() {
    const dispatch = useDispatch<AppDispatch>();
    const { filteredUsers, status, error, sort } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        if (status === 'uninitialized') {
            dispatch(fetchUsers());
        }
    }, [status, dispatch]);


    const handleSort = (field: keyof User) => {
        dispatch(sortUsersByField(field));
    };

    return { filteredUsers, status, error, sort, handleSort };
}