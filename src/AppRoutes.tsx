import { lazy } from "react";
import { Route, Routes } from "react-router";

const App = lazy(() => import('./App'));
const PostDetail = lazy(() => import('./PostDetail'));

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/post" element={<App />} />
            <Route path="/post/:id" element={<PostDetail />} />
        </Routes>
    );
}