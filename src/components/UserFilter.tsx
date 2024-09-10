import useUserFilters from '../hooks/useUserFilters';

export default function UserFilter() {
  const { filters, handleFilterChange, handleClearFilters, isAnyFilterActive } = useUserFilters();

  return (
    <div className="flex flex-col mb-6">
    <div className="mb-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <input
        type="search"
        placeholder="Filter by name..."
        value={filters.name}
        onChange={handleFilterChange('name')}
        className="w-full mx-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="search"
        placeholder="Filter by username..."
        value={filters.username}
        onChange={handleFilterChange('username')}
        className="w-full mx-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="search"
        placeholder="Filter by email..."
        value={filters.email}
        onChange={handleFilterChange('email')}
        className="w-full mx-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="search"
        placeholder="Filter by phone..."
        value={filters.phone}
        onChange={handleFilterChange('phone')}
        className="w-full mx-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      
    </div>
    <button
        onClick={handleClearFilters}
        disabled={!isAnyFilterActive}
        className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
          isAnyFilterActive
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Clear Filters
      </button>
    </div>
  );
};