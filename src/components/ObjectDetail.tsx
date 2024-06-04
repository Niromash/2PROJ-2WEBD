import React from 'react';

interface ObjectDetailProps {
        name: string;
        title: string;
        image: string;
}

const ObjectDetail: React.FC<ObjectDetailProps> = ({  name, title, image }) => {
    return (
        <div className="p-4">
            <p><strong>Title:</strong> {title}</p>
            <p><strong>Artist:</strong> {name}</p>
            <img src={image} alt={title} />
        </div>
    );
};

export default ObjectDetail;
