import { useMemo } from "react";
import { useParams } from "react-router";
import { useAppSelector } from "../hooks/useAppSelector";

export default function MenuDetail() {
    const { id } = useParams();
    const {menuList} = useAppSelector(s => s.menu)

    const menu = useMemo(() => {
        return menuList.filter(menu => menu.id === id)[0];
    }, [menuList, id])

    return <div style={{
        paddingInline: "32px"
    }}>
        <h1>Menu Detail</h1>
        <br />
        <h1>Name: {menu?.nama}</h1>
        <h1>desc: {menu?.deskripsi}</h1>
        <h1>price: {menu?.harga}</h1>
        <h1>size: {menu?.size}</h1>
        <h1>label: {menu?.label}</h1>
        <h1>category: {menu?.kategori}</h1>
    </div>
}