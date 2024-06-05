import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(true); // Set initial state to true

    const navbarItems: { path: string, name: string, icon: IconProp }[] = [
        {
            path: '/',
            name: 'Home',
            icon: faHome
        },
        {
            path: '/advanced-search',
            name: 'Advanced Search',
            icon: faMagnifyingGlass
        }
    ]

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="flex fixed h-screen">
            <div
                className={`flex-shrink-0 ${isCollapsed ? 'w-12' : 'w-48'} bg-gray-800 shadow-md transition-all duration-300`}>
                <nav className="flex flex-col p-4 space-y-4 h-full">
                    <div className="flex items-center justify-between">
                        <button onClick={toggleSidebar} className="text-white focus:outline-none hidden md:block">
                            {isCollapsed ? '→' : '←'}
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className={`${isCollapsed ? 'hidden' : 'block'}`}>
                            <p className="text-white">Museum</p>
                            <p className="text-gray-400 text-sm">Art Museum</p>
                        </div>
                    </div>

                    {navbarItems.map(item => (
                        <Link to={item.path} className="flex items-center justify-between w-full" key={item.path}>
                            <div className="text-white flex items-center mt-3 mb-3 md:mb-0 md:mt-0">
                                <FontAwesomeIcon icon={item.icon} />
                                <span className={`${isCollapsed ? 'hidden' : 'block'} ml-4`}>{item.name}</span>
                            </div>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="flex-1 overflow-auto">
                {/* Your main content goes here */}
            </div>
        </div>
    );
};

export default Sidebar;
