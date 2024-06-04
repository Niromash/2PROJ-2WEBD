import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';  // Import the CSS for react-loading-skeleton
import Card from '../components/Card';
import { ArtObject, getHighlights } from "../services/api.tsx";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
    const [highlights, setHighlights] = useState<ArtObject[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHighlights = async () => {
            try {
                const highlightsData = await getHighlights();
                setHighlights(highlightsData);
            } catch (error) {
                console.error('Error fetching highlights:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHighlights();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Highlights</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    // Display skeletons while loading
                    Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="p-4">
                            <Skeleton height={200} />
                            <Skeleton height={20} width="80%" style={{ margin: '10px 0' }} />
                            <Skeleton height={20} width="60%" />
                        </div>
                    ))
                ) : (
                    highlights.map(item => (
                        <Link to={`/objects/${item.objectID}`} key={item.objectID}>
                            <Card
                                image={item.primaryImage}
                                title={item.title}
                                author={item.artistDisplayName}
                            />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default HomePage;
