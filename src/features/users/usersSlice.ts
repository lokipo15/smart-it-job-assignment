import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { UsersState } from "../../types/UsersState";
import sortUsers from "../../helpers/sortUsers";
import applyFilters from "../../helpers/applyFilters";

const initialState: UsersState = {
    status: 'uninitialized',
    users: [],
    filters: {
        name: '',
        username: '',
        email: '',
        phone: '',
      },
    sort: {
      field: null,
      order: null,
    },
    filteredUsers: [],
    error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return response.json();
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        filterUsers: (state, action: PayloadAction<{ field: string; value: string }>) => {
            const { field, value } = action.payload;

            // Update the filter value
            state.filters[field as keyof typeof state.filters] = value.toLowerCase();
            
            // Filter the users based on the new filters
            state.filteredUsers = applyFilters(state.users, state.filters);

            // If sorting is active, apply it
            if (state.sort.field && state.sort.order) {
                sortUsers(state.filteredUsers, state.sort.field, state.sort.order);
            }
        },

        clearFilters: (state) => {
            // Clear the filters
            state.filters = initialState.filters;

            // Reset the filteredUsers to the original users
            state.filteredUsers = state.users;

            // If sorting is active, apply it
            if (state.sort.field && state.sort.order) {
                sortUsers(state.filteredUsers, state.sort.field, state.sort.order);
            }
        },
        
        sortUsersByField: (state, action: PayloadAction<keyof User>) => {
            const field = action.payload;

            if (state.sort.field === field) {
                // If the field is already being sorted, toggle the order
                if (state.sort.order === 'desc') {
                    state.sort.order = 'asc';
                } 
                else if (state.sort.order === 'asc') {
                    state.sort.field = null;
                    state.sort.order = null;
                }
                // First time sorting by this field
                else {
                    state.sort.order = 'desc';
                }
            } 
            // New sort field
            else {
                state.sort.field = field;
                state.sort.order = 'desc';
            }

            // Apply filters
            state.filteredUsers = applyFilters(state.users, state.filters);

            // Apply sorting
            if (state.sort.field && state.sort.order) {
                sortUsers(state.filteredUsers, state.sort.field, state.sort.order);
            } 
        }
    },

    // Handle fetchUsers state
    extraReducers: (builder) => {
        builder
            // Loading users
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })

            // Successfully loaded users
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'success';
                state.users = action.payload;
                state.filteredUsers = action.payload; // Initialize filteredUsers with all users
            })

            // Failed to load users
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'error';
                state.error = action.error.message || "Failed to fetch users";
            });
    }
});

export const { filterUsers, clearFilters, sortUsersByField } = usersSlice.actions;
export default usersSlice.reducer;