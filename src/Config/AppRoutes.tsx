import { lazy } from "react";
import { Route, Routes } from "react-router";

const Menu = lazy(() => import('../pages/Menus'));
const AddMenu = lazy(() => import('../pages/AddMenu'));
const MenuDetail = lazy(() => import('../pages/MenuDetail'));
const EditMenu = lazy(() => import('../pages/EditMenu'));

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/list-menu" element={<Menu />} />
            <Route path="/menu/add" element={<AddMenu />} />
            <Route path="/menu/:id" element={<MenuDetail />} />
            <Route path="/menu/edit/:id" element={<EditMenu />} />
        </Routes>
    );
}