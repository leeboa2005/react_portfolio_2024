import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Project from '../pages/Project';
import About from '../pages/About';
import Layout from './Layout';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/project" element={<Project />} />
                    <Route path="/about" element={<About />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
