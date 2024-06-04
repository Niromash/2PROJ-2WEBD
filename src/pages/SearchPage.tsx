import React, { useState } from 'react';

interface SearchResult {
    id: string;
    name: string;
    description: string;
}

const SearchPage: React.FC = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetch(`https://api.museum.com/search?query=${query}`)
            .then(response => response.json())
            .then(data => setResults(data));
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Advanced Search</h1>
            <form onSubmit={handleSearch} className="mb-4">
                <input
                    type="text"
                    className="p-2 border rounded w-full"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-2">
                    Search
                </button>
            </form>
            <div>
                {results.map(item => (
                    <div key={item.id} className="mb-4">
                        <h2 className="text-xl font-bold">{item.name}</h2>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
