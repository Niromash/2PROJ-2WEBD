import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/HomePage.tsx";
import Layout from "./layouts/Layout.tsx";
import ObjectPage from "./pages/ObjectPage.tsx";
import AdvancedSearchPage from "./pages/AdvcancedSearchPage.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home/>}/>
                <Route path="/advanced-search" element={<AdvancedSearchPage/>}/>
                <Route path="/objects/:id" element={<ObjectPage />} />
            </Route>
            <Route path="*" element={"Cette page n'existe pas"}/>
        </Routes>
    );
}

export default App;