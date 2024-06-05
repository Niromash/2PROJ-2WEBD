import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {useNavigate} from "react-router-dom";

const QuickSearchBar: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const searchQuery = formData.get('search') as string;
        navigate(`/?q=${encodeURIComponent(searchQuery)}`);
    }

    return (
        <form className={"flex items-center gap-x-4"} onSubmit={handleSubmit}>
            <input type="text" placeholder="Quick Search" name="search"
                   className="px-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none"/>
            <button>
                <FontAwesomeIcon icon={faSearch} className="text-white"/>
            </button>
        </form>
    );
};

export default QuickSearchBar;
