import React, {useState} from 'react';
import QuickSearchBar from "./QuickSearchBar.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

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
        <div className="flex h-screen">
            <div
                className={`top-0 left-0 ${isCollapsed ? 'w-28' : 'w-64'} h-full bg-gray-800 shadow-md transition-all duration-300`}>
                <nav className="flex flex-col p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <button onClick={toggleSidebar} className="text-white focus:outline-none">
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
                        <Link to={item.path} className="flex items-center justify-between w-full">
                            <div className="text-white flex items-center">
                                <FontAwesomeIcon icon={item.icon}/>
                                <span className={`${isCollapsed ? 'hidden' : 'block'} ml-4`}>{item.name}</span>
                            </div>
                        </Link>
                    ))}

                    {isCollapsed ? null : <QuickSearchBar/>}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;