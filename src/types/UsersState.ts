import { User } from "./User";

export type SortOrder = 'asc' | 'desc' | null;

export interface UsersState {
    users: User[];
    filteredUsers: User[];
    filters: {
        name: string;
        username: string;
        email: string;
        phone: string;
      };
    sort: {
      field: keyof User | null;
      order: SortOrder;
    };
    status: 'uninitialized' | 'loading' | 'success' | 'error';
    error: string | null;
}