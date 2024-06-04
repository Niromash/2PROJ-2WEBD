import React, {useEffect, useState} from 'react';
import Card from '../components/Card';
import {ArtObject, getHighlights} from "../services/api.tsx";
import {Link} from "react-router-dom";

const HomePage: React.FC = () => {
    const [highlights, setHighlights] = useState<ArtObject[]>([]);

    useEffect(() => {
        const fetchHighlights = async () => {
            try {
                const highlightsData = await getHighlights();
                setHighlights(highlightsData);
            } catch (error) {
                console.error('Error fetching highlights:', error);
            }
        };

        fetchHighlights();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Highlights</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {highlights.map(item => (
                    <Link to={`/objects/${item.objectID}`}>
                        <Card
                        key={item.objectID}
                        image={item.primaryImage}
                        title={item.title}
                        author={item.artistDisplayName}
                    />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
