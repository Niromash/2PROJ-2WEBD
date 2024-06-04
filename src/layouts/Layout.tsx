import {Outlet} from "react-router-dom";
import Sidebar from "../components/Sidebar.tsx";

export default function Layout() {
    return (
        <>
            <div className="flex w-full">
                <Sidebar/>
                <Outlet/>
            </div>
        </>
    )
}