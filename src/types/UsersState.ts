import { User } from "./User";

export interface UsersState {
    users: User[];
    filteredUsers: User[];
    filters: {
        name: string;
        email: string;
        phone: string;
      };
    status: 'uninitialized' | 'loading' | 'success' | 'error';
    error: string | null;
}