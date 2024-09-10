import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchUsers, sortUsersByField } from "../features/users/usersSlice";
import { User } from "../types/User";

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