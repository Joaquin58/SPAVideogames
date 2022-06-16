import { createSlice } from "@reduxjs/toolkit";

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