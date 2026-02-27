import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AsyncDataState, Menu } from "../types";

export type MenuState = {
    menuList: Menu[];
    menuState: AsyncDataState;
}

const initialState: MenuState = {
    menuList: [],
    menuState: "pending"
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenu: (state, action: PayloadAction<Menu[]>) => {
            state.menuList = action.payload;
        },
        setMenuState: (state, action: PayloadAction<AsyncDataState>) => {
            state.menuState = action.payload
        }
    }
})

export const menuActions = menuSlice.actions;
export const menuReducer = menuSlice.reducer;