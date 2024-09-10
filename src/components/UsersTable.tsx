import { User } from '../types/User';
import useUserTable from '../hooks/useUserTable';

export default function UserTable() {
  const { filteredUsers, status, error } = useUserTable();

  if (status === 'loading') {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  if (status === 'error') {
    return <div className="flex justify-center items-center">Error: {error}</div>;
  }

  if (filteredUsers.length === 0) {
    return <div className="flex justify-center items-center">No users with the specified filters found.</div>;
  }

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Email</th>
          <th className="py-2 px-4 border-b">Phone</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user: User) => (
          <tr key={user.id}>
            <td className="py-2 px-4 border-b">{user.name}</td>
            <td className="py-2 px-4 border-b">{user.email}</td>
            <td className="py-2 px-4 border-b">{user.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
