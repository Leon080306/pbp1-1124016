import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type {Menu} from "./../types";

export default function MenuDetail() {
    const { id } = useParams();
    const [menu, setMenu] = useState<Menu | undefined>(undefined);

    useEffect(() => {
        const getDetails = async () => {
            const response = await fetch("http://localhost:5173/api/menu/" + id, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
            })

            const data = await response.json();
            if (response.status !== 200) {
                alert("Failed to create menu: " + data.message);
                return;
            }
            setMenu(data);
        }
        getDetails();
    }, [])

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