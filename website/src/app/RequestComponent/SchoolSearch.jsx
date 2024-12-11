import React from 'react';
import { Search } from 'lucide-react';

export function SchoolSearch({ searchQuery, onSearchChange }) {
  return (
    <div className="relative max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search schools..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm placeholder-gray-400 transition-shadow hover:shadow-md"
        />
      </div>
    </div>
  );
}