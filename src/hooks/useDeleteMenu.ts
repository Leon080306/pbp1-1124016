import { useCallback } from "react";
import { useMenu } from "./useMenu";

export function useDeleteMenu() {
    const {reload} = useMenu();
    return useCallback(async (payload: string) => {
        try {
            const response = await fetch("http://localhost:5173/api/delete-menu/" + payload, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                },
            })

            const data = await response.json();
            if (response.status !== 200) {
                throw new Error("Failed to delete menu: " + data.messsage);
            }
            reload();
            return true;
        } catch(error) {
            alert(error);
            return false;
        }
    }, [])
}