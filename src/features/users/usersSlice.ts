import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { UsersState } from "../../types/UsersState";
import sortUsers from "../../helpers/sortUsers";

const initialState: UsersState = {
    status: 'uninitialized',
    users: [],
    filters: {
        name: '',
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
            state.filteredUsers = state.users.filter((user) => {
              return Object.entries(state.filters).every(([key, filterValue]) => {

                // No filter specified for this field
                if (!filterValue) return true;

                // Get the user's value for this field
                const userValue = user[key as keyof User]?.toString().toLowerCase();

                // Check if the user's value includes the filter value
                return userValue.includes(filterValue);
              });
            });

            if (state.sort.field && state.sort.order) {
                sortUsers(state.filteredUsers, state.sort.field, state.sort.order);
            }
        },

        sortUsersByField: (state, action: PayloadAction<{ field: keyof User}>) => {
            const { field } = action.payload;

            if (state.sort.field === field) {
                // If the field is already being sorted, toggle the order
                if (state.sort.order === 'desc') {
                    state.sort.order = "asc";
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
                state.sort.order = 'asc';
            }

            if (state.sort.field && state.sort.order) {
                sortUsers(state.filteredUsers, state.sort.field, state.sort.order);
            } 
            // Reset table to original order
            else {
                state.filteredUsers = [...state.users];
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

export const { filterUsers, sortUsersByField } = usersSlice.actions;
export default usersSlice.reducer;