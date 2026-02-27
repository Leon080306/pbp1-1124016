import { useCallback } from "react";
import type { CreateMenuPayload } from "../types";
import { useMenu } from "./useMenu";

export function useCreateMenu() {
    const {reload} = useMenu();
    return useCallback(async (payload: CreateMenuPayload) => {
        const response = await fetch("http://localhost:5173/api/create-menu", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                nama: payload.nama,
                deskripsi: payload.deskripsi,
                harga: payload.harga, 
                size: payload.size,
                label: payload.label,
                kategori: payload.kategori
            }),
        })

        const data = await response.json();
        if (response.status !== 200) {
            alert("Failed to create menu: " + data.message);
            return false;
        }
        reload();
        return true;
    }, [reload])
}