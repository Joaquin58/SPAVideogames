import { createSlice } from "@reduxjs/toolkit";

export const genresSlice = createSlice({
    name: "genres",
    initialState: {
        genres: [],
        loading: true
    },
    reducers: {
        getAllGenres: (state, action) => {
            state.genres = action.payload
            state.loading = false
        },

    },
});

export const { getAllGenres } = genresSlice.actions

export default genresSlice.reducer;