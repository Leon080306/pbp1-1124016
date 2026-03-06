import { lazy } from "react";
import { Route, Routes } from "react-router";

const Homepage = lazy(() => import('../pages/Homepage'));
const EditBook = lazy(() => import('../pages/EditBook'));
const BookDetail = lazy(() => import('../pages/BookDetail'));

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/book/edit/:id" element={<EditBook />} />
            <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
    );
}