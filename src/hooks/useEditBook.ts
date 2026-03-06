import { useCallback } from "react";
import type { EditBookPayload } from "../types";

export function useEditBook() {
    return useCallback(async (payload: EditBookPayload) => {
        const response = await fetch("http://localhost:5173/api/buku/" + payload.id, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                data: {
                    judul: payload.judul,
                    deskripsi: payload.deskripsi,
                    tahun: payload.tahun,
                    kategori: payload.kategori
                }
            }),
        })
        if (response.status !== 200) {
            return false;
        }
        return true;
    }, [])
}