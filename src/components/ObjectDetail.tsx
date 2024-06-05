import React from 'react';

interface ObjectDetailProps {
    name: string;
    title: string;
    image: string;
    artistDisplayBio: string;
    dimensions: string;
    additionalImages: string[];
}

const ObjectDetail: React.FC<ObjectDetailProps> = ({name, title, image, artistDisplayBio, dimensions, additionalImages}) => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-20">
            <img className="w-80 object-cover rounded-lg mb-4 mx-auto" src={image} alt={title}/>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
                <p className="text-lg text-gray-700 mb-4"><strong>Artist:</strong> {name}</p>
                <p className="text-lg text-gray-700 mb-4"><strong>Artist Bio:</strong> {artistDisplayBio}</p>
                <p className="text-lg text-gray-700 mb-4"><strong>Dimensions:</strong> {dimensions}</p>
                <div className="flex justify-center">
                    {additionalImages.map((img, index) => (
                        <img key={index} className="w-32 object-cover rounded-lg mx-2" src={img} alt={title}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ObjectDetail;
