import { User } from '../types/User';
import useUserTable from '../hooks/useUserTable';
import UsersTableEntry from './UsersTableEntry';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';

export default function UserTable() {
  const { filteredUsers, status, error, sort, handleSort } = useUserTable();

  // Render the proper icon depending on the sort state
  const renderSortIcon = (field: keyof User) => {
    if (sort.field !== field) 
      return <ChevronsUpDown className='inline-block ml-1 w-4 h-4 text-gray-400' />;

    if (sort.order === 'desc')
      return <ChevronDown className='inline-block ml-1 w-4 h-4 text-blue-500' />;

    return <ChevronUp className='inline-block ml-1 w-4 h-4 text-blue-500' />;
  }

  if (status === 'loading') {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  if (status === 'error') {
    return <div className="flex justify-center items-center">Error: {error}</div>;
  }

  if (filteredUsers.length === 0) {
    return <div className="flex justify-center items-center">No users with specified filters found.</div>;
  }

  return (
    <table className="w-full bg-white border border-gray-300 overflow-auto">
      <thead>
        <tr className='bg-gray-200'>
          {["name", "username", "email", "phone"].map((field) => (
            <th 
              key={field} 
              className={"py-2 w-1/4 px-4 border-b text-left cursor-pointer " + (sort.field === field ? "bg-gray-300" : "")}
              onClick={() => handleSort(field as keyof User)}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
                {renderSortIcon(field as keyof User)}
              </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user: User, index: number) => (
          <UsersTableEntry key={user.id} user={user} colored={index % 2 === 1} />
        ))}
      </tbody>
    </table>
  );
};
