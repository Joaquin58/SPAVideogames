import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const genresSlice = createSlice({
    name: "genres",
    initialState: {
        list: [],
        loading: true
    },
    reducers: {
        setGenresList: (state, action) => {
            state.list = action.payload
            state.loading = false
        }
    },
});

export const { setGenresList } = genresSlice.actions

export default genresSlice.reducer;

export const fetchallGenres = () => (dispatch) => {
    axios.get(`/genres`).then(({ data }) => {
        dispatch(setGenresList(data))
    }).catch(err => console.log(err))
}