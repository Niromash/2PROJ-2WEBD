import React, {useState} from 'react';

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="flex h-full">
            <div
                className={`top-0 left-0 ${isCollapsed ? 'w-28' : 'w-64'} h-full bg-gray-800 shadow-md transition-all duration-300`}>
                <nav className="flex flex-col p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-white whitespace-nowrap overflow-hidden transition-all duration-300">
                            <img src="path_to_profile_image.jpg" alt="Profile"
                                 className="w-10 h-10 rounded-full"/>
                        </span>
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
                    <a href="/dashboard" className="text-white flex items-center">
                        <i className="fas fa-tachometer-alt"></i>
                        <span className={`${isCollapsed ? 'hidden' : 'block'} ml-4`}>Home</span>
                    </a>
                    <a href="/profile" className="text-white flex items-center">
                        <i className="fas fa-user"></i>
                        <span className={`${isCollapsed ? 'hidden' : 'block'} ml-4`}>Search</span>
                    </a>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;