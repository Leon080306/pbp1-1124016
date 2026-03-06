import { useCallback } from "react";

export function useKembalikan() {
    return useCallback(async (payload: string) => {
        const response = await fetch("http://localhost:5173/api/buku/" + payload + "/balik", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
        })
        if (response.status !== 200) {
            return false;
        }
        return true;
    }, [])
}