import { createSlice } from "@reduxjs/toolkit";

export const generalSilce = createSlice({
    name: "general",
    initialState: {
        savename: '',
        ordertype: '',
        statePag: '',
    },
    reducers: {
        saveName: (state, { payload }) => {
            state.savename = payload;
        },
        orderchange: (state, { payload }) => {
            state.ordertype = payload
        },
        savePage: (state, { payload }) => {
            state.statePag = payload
        }
    }
});

export const { saveName, orderchange, savePage } = generalSilce.actions

export default generalSilce.reducer