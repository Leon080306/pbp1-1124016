import { useCallback } from "react";
import type { EdigtMenuPayload } from "../types";
import { useMenu } from "./useMenu";

export function useEditMenu() {
    const {reload} = useMenu();
    return useCallback(async (payload: EdigtMenuPayload) => {
        try {
            const response = await fetch("http://localhost:5173/api/update-menu/" + payload.id, {
                method: "PUT",
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
                throw new Error("Failed to edit menu: " + data.message);
            }
            reload();
            return true;
        } catch {
            return false;
        }
    }, [])
}