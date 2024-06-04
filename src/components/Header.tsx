import React from 'react';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Musée</h1>
            <SearchBar />
        </header>
    );
};

export default Header;
