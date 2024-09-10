import React from 'react';
import { useDispatch } from 'react-redux';
import { filterUsers } from '../features/users/usersSlice';

export default function UserFilter() {
  const dispatch = useDispatch();

  const handleFilterChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterUsers({ field, value: e.target.value }));
  };

  return (
    <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="Filter by name..."
        onChange={handleFilterChange('name')}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Filter by email..."
        onChange={handleFilterChange('email')}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Filter by phone..."
        onChange={handleFilterChange('phone')}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};