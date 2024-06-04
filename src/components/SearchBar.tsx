import React, { useState } from 'react';

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement search functionality
    };

    return (
        <form onSubmit={handleSearch} className="flex">
            <input
                type="text"
                className="p-2 rounded-l"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="bg-blue-700 text-white p-2 rounded-r">
                Search
            </button>
        </form>
    );
};

export default SearchBar;
