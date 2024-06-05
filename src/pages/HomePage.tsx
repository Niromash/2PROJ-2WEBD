import React, {useEffect, useState} from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import the CSS for react-loading-skeleton
import Card from '../components/Card';
import {ArtObject, getHighlights} from "../services/api.ts";
import {Link, useNavigate, useSearchParams} from "react-router-dom";

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [query] = useSearchParams();
    const [highlights, setHighlights] = useState<ArtObject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    if (error) setError(null);

    useEffect(() => {
        const fetchHighlights = async () => {
            try {
                const querySearch = query?.get("q");
                const highlightsData = await getHighlights(querySearch ?? undefined);

                if (highlightsData.length === 0) {
                    setError('No highlights found');
                    return;
                }

                if (querySearch) {
                    for (const highlightsDatum of highlightsData) {
                        if (highlightsDatum.title.toLowerCase() === querySearch.toLowerCase()) {
                            navigate(`/objects/${highlightsDatum.objectID}`);
                            return;
                        }
                    }
                }

                setHighlights(highlightsData);
            } catch (error) {
                console.error('Error fetching highlights:', error);
                setError('Failed to fetch highlights: ' + error);
            } finally {
                setLoading(false);
            }
        };

        fetchHighlights();
    }, [navigate, query]);

    return (
        <div className="p-4">
            <p className="text-red-500 text-sm font-bold">{error}</p>
            <h1 className="text-3xl font-bold mb-4">{query.get("q") ? `Search results for "${query.get("q")}"` : 'Highlights'}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    // Display skeletons while loading
                    Array.from({length: 6}).map((_, index) => (
                        <div key={index} className="p-4">
                            <Skeleton height={300} width={300}/>
                            <Skeleton height={20} width="80%"/>
                            <Skeleton height={20} width="60%"/>
                        </div>
                    ))
                ) : (
                    highlights.map(item => (
                        <Link to={`/objects/${item.objectID}`} key={item.objectID}>
                            <Card
                                image={item.primaryImage}
                                title={item.title}
                                artist={item.artistDisplayName}
                            />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default HomePage;
