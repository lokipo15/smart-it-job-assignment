import { User } from "../types/User";

interface UsersTableEntryProps {
    user: User;
    colored: boolean;
}

export default function UsersTableEntry({ user, colored }: UsersTableEntryProps) {
    return (
        <tr className={`${
            colored ? "bg-gray-100 hover:bg-gray-200 active:bg-gray-300" 
                    : "hover:bg-gray-100 active:bg-gray-200"
                    } cursor-pointer transition-colors duration-200`}
        >

            <td className="py-2 px-4 border-b ">{user.name}</td>
            <td className="py-2 px-4 border-b">{user.username}</td>
            <td className="py-2 px-4 border-b">{user.email}</td>
            <td className="py-2 px-4 border-b">{user.phone}</td>
        </tr>
    )
}