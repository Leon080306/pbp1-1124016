import { useCallback, useMemo } from "react";
import { menuActions } from "../store/menuSlice";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";

export function useMenu() {
    const dispatch = useAppDispatch();
    const { menuList, menuState } = useAppSelector((state) => state.menu);

    const reload = useCallback(async () => {
        dispatch(menuActions.setMenuState("loading"));
        try {
            const response = await fetch("http://localhost:5173/api/list-menu", {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
            })
            if(response.status !== 200) {
                throw new Error("Failed to fetch menu");
            }
            const data = await response.json();
            dispatch(menuActions.setMenu(data));
            dispatch(menuActions.setMenuState("fulffiled"));
        } catch {
            dispatch(menuActions.setMenuState("error"));
        }
    }, [])

    return useMemo(() => {
        return { menuList, menuState, reload };
    }, [menuList, menuState, reload]);
}