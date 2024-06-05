import React, {useState} from 'react';
import {advancedSearch, ArtObject, SearchRequest} from '../services/api';
import Card from "../components/Card.tsx";

const AdvancedSearchPage: React.FC = () => {
    const [searchRequest, setSearchRequest] = useState<SearchRequest>({} as SearchRequest);
    const [searchResults, setSearchResults] = useState<ArtObject[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchRequest({
            ...searchRequest,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const results = await advancedSearch(searchRequest);
        setSearchResults(results);
    };

    return (
        <div className="p-6">
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                <input
                    type="text"
                    name="query"
                    placeholder="Query"
                    required
                    onChange={handleInputChange}
                    className="px-4 py-2 border rounded-md"
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={handleInputChange}
                    className="px-4 py-2 border rounded-md"
                />
                <input
                    type="text"
                    name="tags"
                    placeholder="Tags"
                    onChange={handleInputChange}
                    className="px-4 py-2 border rounded-md"
                />
                <input
                    type="text"
                    name="geoLocation"
                    placeholder="Geo Location"
                    onChange={handleInputChange}
                    className="px-4 py-2 border rounded-md"
                />
                <input
                    type="number"
                    name="dateYearBegin"
                    placeholder="Date Year Begin"
                    onChange={handleInputChange}
                    className="px-4 py-2 border rounded-md"
                />
                <input
                    type="number"
                    name="dateYearEnd"
                    placeholder="Date Year End"
                    onChange={handleInputChange}
                    className="px-4 py-2 border rounded-md"
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Search</button>
            </form>
            <div className="mt-6 grid grid-cols-1 gap-6">
                {Object.keys(searchRequest).length !== 0 && searchResults.length === 0 && (
                    <p className="text-center">No results found</p>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {searchResults.map(item => (
                        <Card
                            image={item.primaryImage}
                            title={item.title}
                            artist={item.artistDisplayName}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdvancedSearchPage;