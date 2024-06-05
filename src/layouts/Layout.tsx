import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar.tsx";
import QuickSearchBar from "../components/QuickSearchBar.tsx";

export default function Layout() {
    return (
        <>
            <div className="flex w-full">
                <Sidebar/>
                <div className="flex flex-col items-center w-full mt-8">
                    <QuickSearchBar/>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}