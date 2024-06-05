import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faX} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {useNavigate} from "react-router-dom";

const QuickSearchBar: React.FC = () => {
    const navigate = useNavigate();
    const currentSearchQuery = new URLSearchParams(window.location.search).get('q') || '';

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const searchQuery = formData.get('search') as string;
        navigate(`/?q=${encodeURIComponent(searchQuery)}`);
    }

    const handleClear = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        navigate('/');
    }

    return (
        <form className="flex items-center gap-x-4" onSubmit={handleSubmit}>
            <div className="relative">
                <input type="text" placeholder="Quick Search" name="search"
                       className="px-4 py-1 bg-gray-200 text-black rounded-md focus:outline-none" defaultValue={currentSearchQuery} />
                <div className="flex items-center cursor-pointer absolute right-2 -translate-y-[1.4rem]" onClick={handleClear}>
                    <FontAwesomeIcon icon={faX} className="text-black text-sm"/>
                </div>
            </div>
            <button>
                <FontAwesomeIcon icon={faSearch} className="text-black"/>
            </button>
        </form>
    );
};

export default QuickSearchBar;
