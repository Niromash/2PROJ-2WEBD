import React, { useState } from 'react';
import { advancedSearch, ArtObject, SearchRequest } from '../services/api';
import Card from "../components/Card.tsx";
import { Link } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import '../assets/searchForm.css';

const AdvancedSearchPage: React.FC = () => {
    const [searchRequest, setSearchRequest] = useState<SearchRequest>({} as SearchRequest);
    const [searchResults, setSearchResults] = useState<ArtObject[]>([]);
    const [loading, setLoading] = useState(false);
    const [moveRight, setMoveRight] = useState(true);
    const [shakeButton, setShakeButton] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchRequest({
            ...searchRequest,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const { query } = searchRequest;
        if (!query) {
            setShakeButton(true);
            setTimeout(() => setShakeButton(false), 500);
            return;
        }
        setLoading(true);
        const results = await advancedSearch(searchRequest);
        setSearchResults(results);
        setLoading(false);
    };

    const handleMouseEnter = () => {
        const { query } = searchRequest;
        if (!query) {
            setMoveRight(!moveRight);
        }
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
                <button
                    type="submit"
                    onMouseEnter={handleMouseEnter}
                    className={`px-4 py-2 bg-blue-500 text-white rounded-md ${moveRight ? 'move-right' : 'move-left'} ${shakeButton ? 'shake' : ''}`}
                >
                    Search
                </button>
            </form>
            <div className="mt-6">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="p-4">
                                <Skeleton height={300} width={350} />
                                <Skeleton height={20} width="80%" />
                                <Skeleton height={20} width="60%" />
                            </div>
                        ))}
                    </div>
                ) : (
                    searchResults.length === 0 ? (
                        <p>No results found</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {searchResults.map(item => (
                                <Link to={`/objects/${item.objectID}`} key={item.objectID}>
                                    <Card
                                        image={item.primaryImage}
                                        title={item.title}
                                        artist={item.artistDisplayName}
                                    />
                                </Link>
                            ))}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default AdvancedSearchPage;
