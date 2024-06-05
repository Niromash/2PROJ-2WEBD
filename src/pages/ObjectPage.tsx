import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {ArtObject, getObjectDetails} from '../services/api.ts';
import ObjectDetail from '../components/ObjectDetail';
import Skeleton from "react-loading-skeleton";

interface RouteParams {
    id: string;
}

const ObjectPage: React.FC = () => {
    const {id} = useParams<Record<string, string>>() as unknown as RouteParams;
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
        <div className="w-full">
            {object ? <ObjectDetail name={object.artistDisplayName} title={object.title} image={object.primaryImage}
                                    artistDisplayBio={object.artistDisplayBio} dimensions={object.dimensions}
                                    additionalImages={object.additionalImages}/> : <div className="flex flex-col justify-center text-center mt-10"><Skeleton height={300} width={350}/><Skeleton height={30} width={400} className="mt-5"/></div>

}
</div>
)
    ;
};

export default ObjectPage;
