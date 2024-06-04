import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getObjectDetails, ArtObject } from '../services/api';
import ObjectDetail from '../components/ObjectDetail';

interface RouteParams {
    id: string;
}

const ObjectPage: React.FC = () => {
    const { id } = useParams<Record<string, string>>() as unknown as RouteParams;
    const [object, setObject] = useState<ArtObject | null>(null);

    useEffect(() => {
        const fetchObjectDetails = async () => {
            try {
                const objectData = await getObjectDetails(Number(id));
                setObject(objectData);
            } catch (error) {
                console.error('Error fetching object details:', error);
            }
        };

        fetchObjectDetails();
    }, [id]);

    return (
        <div className="p-4">
            {object ? <ObjectDetail name={object.artistDisplayName} title={object.title} image={object.primaryImage}/> : <p>Loading...</p>}
        </div>
    );
};

export default ObjectPage;
