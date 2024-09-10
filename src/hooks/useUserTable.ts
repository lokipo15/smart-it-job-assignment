import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useEffect } from "react";
import { fetchUsers } from "../features/users/usersSlice";

export default function useUserTable() {
    const dispatch = useDispatch<AppDispatch>();
    const { filteredUsers, status, error, sort } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        if (status === 'uninitialized') {
            dispatch(fetchUsers());
        }
    }, [status, dispatch]);

    return { filteredUsers, status, error, sort };
}