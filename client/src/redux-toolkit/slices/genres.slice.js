import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const genresSlice = createSlice({
    name: "genres",
    initialState: {
        genres: [],
        loading: true
    },
    reducers: {
        getAllGenres: (state, action) => {
            state.list = action.payload
            state.loading = false
        },

    },
});

export const { getAllGenres } = genresSlice.actions

export default genresSlice.reducer;

export const getGenres = () => (dispatch) => {
    axios.get(`/genres`).then(({ data }) => {
        dispatch(getAllGenres(data))
    }).catch(err => console.log(err))
}