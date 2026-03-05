import { lazy } from "react";
import { Route, Routes } from "react-router";

const Homepage = lazy(() => import('../pages/Homepage'));

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
        </Routes>
    );
}