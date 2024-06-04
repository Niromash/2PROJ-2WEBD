import React from 'react';

interface CardProps {
    image: string;
    title: string;
    artist: string;
}

const Card: React.FC<CardProps> = ({ image, title, artist }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <img className="w-full" src={image} alt={title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-700 text-base">
                    {artist}
                </p>
            </div>
        </div>
    );
}

export default Card;