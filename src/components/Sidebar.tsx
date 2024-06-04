import React, {useState} from 'react';
import SearchBar from "./SearchBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

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
                    <Link to={"/"} className="text-white flex items-center">
                        <FontAwesomeIcon icon={faHome} className="text-white"/>
                        <span className={`${isCollapsed ? 'hidden' : 'block'} ml-4`}>Home</span>
                    </Link>

                    {isCollapsed ? null : <SearchBar/>}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;