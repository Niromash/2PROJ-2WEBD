import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar.tsx";
import QuickSearchBar from "../components/QuickSearchBar.tsx";

export default function Layout() {
    return (
        <>
            <div className="flex w-full">
                <Sidebar/>
                <div className="flex flex-col items-center w-full mt-8 ml-10 md:ml-56">
                    <h1 className="text-4xl font-bold text-gray-800 mb-10">Museum of Art</h1>
                    <QuickSearchBar/>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}