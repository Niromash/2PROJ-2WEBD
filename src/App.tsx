import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Layout from "./layouts/Layout.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home/>}/>
            </Route>
            <Route path="*" element={"Cette page n'existe pas"}/>
        </Routes>
    );
}

export default App;