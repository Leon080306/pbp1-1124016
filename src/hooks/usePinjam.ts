import { useCallback } from "react";
import type { PinjamBukuPayload } from "../types";

export function usePinjam() {
    return useCallback(async (payload: PinjamBukuPayload) => {
        const response = await fetch("http://localhost:5173/api/buku/" + payload.id + "/pinjam", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                peminjam: {
                    nama: payload.nama
                }
            }),
        })
        if (response.status !== 200) {
            return false;
        }
        return true;
    }, [])
}