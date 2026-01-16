'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Add search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full ">
      <input
        type="text"
        placeholder="Search ..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-4 py-2 pr-10 border border-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent text-black"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
      >
        <Search className="w-5 h-5 text-gray-500" />
      </button>
    </form>
  );
};

export default SearchBar;
