import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight, faHome, faQuestion} from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
    const navbarItems = [
        {
            name: "Home",
            path: "/",
            icon: faHome
        },
        {
            name: "About",
            path: "/about",
            icon: faQuestion
        }
    ]

    const [reduced, setReduced] = useState(false);

    return (
        <>
            <div className="relative">
                {reduced ? (
                    <div className="flex flex-col gap-y-4 h-screen px-4 pt-8 bg-gray-200">
                        <h1 className="text-3xl font-bold text-center">Museum</h1>
                        <ul className="flex flex-col gap-y-2 items-center">
                            {navbarItems.map(item => (
                                <li key={item.path} className="flex items-center justify-between w-full px-6">
                                    <FontAwesomeIcon icon={item.icon}/>
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div className="flex flex-col gap-y-4 h-screen px-4 pt-8 items-center bg-gray-200">
                        <ul className="flex flex-col gap-y-2 items-center">
                            {navbarItems.map(item => (
                                <li key={item.path} className="flex items-center justify-between w-full">
                                    <FontAwesomeIcon icon={item.icon}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <button onClick={() => setReduced(!reduced)}
                        className="absolute bottom-0 right-0 p-2 bg-gray-300 rounded-full">
                    <FontAwesomeIcon icon={reduced ? faArrowLeft : faArrowRight}/>
                </button>
            </div>

        </>
    )
}