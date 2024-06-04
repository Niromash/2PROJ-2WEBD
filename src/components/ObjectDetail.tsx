import React from 'react';

interface ObjectDetailProps {
    object: {
        image: string;
        name: string;
        department: string;
        period: string;
        author: string;
        description: string;
    };
}

const ObjectDetail: React.FC<ObjectDetailProps> = ({ object }) => {
    return (
        <div className="p-4">
            <img src={object.image} alt={object.name} className="w-full h-auto" />
            <h2 className="text-2xl font-bold my-4">{object.name}</h2>
            <p><strong>Department:</strong> {object.department}</p>
            <p><strong>Period:</strong> {object.period}</p>
            <p><strong>Author:</strong> {object.author}</p>
            <p>{object.description}</p>
        </div>
    );
};

export default ObjectDetail;
