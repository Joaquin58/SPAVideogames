import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const platformsSlice = createSlice({
    name: "platforms",
    initialState: {
        plataformas: []
    },
    reducers: {
        savePlatforms: (state, { payload }) => {
            state.plataformas = payload
        }
    }
});


export const { savePlatforms } = platformsSlice.actions;

export default platformsSlice.reducer;

export const getPlatforms = () => (dispatch) => {
    axios.get(`/platfoms`).then(({ data }) => {
        dispatch(savePlatforms(data))
    }).catch(() => {
        dispatch(savePlatforms([]))
    })
}