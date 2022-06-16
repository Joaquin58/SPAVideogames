import { createSlice } from "@reduxjs/toolkit";

export const videogamesSlice = createSlice({
    name: "videogames",
    initialState: {
        allVideogames: [],
        videogames: [],
        idvideogame: [],
        postgame: false,
        putgame: false,
        deletegame: false
    },
    reducers: {
        saveVideogames: (state, { payload }) => {
            state.allVideogames = payload
            state.videogames = payload
        },
        idvideogame: (state, { payload }) => {
            state.idvideogame = payload
        },
        orderVideogamesByRaiting: (state, { payload }) => {
            const ratingorder = payload === 'max' ? state.videogames.sort(function (a, b) {
                if (a.rating < b.rating) {
                    return 1;
                }
                if (a.rating > b.rating) {
                    return -1;
                }

                return 0;
            }) : payload === 'min' ? state.videogames.sort(function (a, b) {
                if (a.rating > b.rating) {
                    return 1;
                }
                if (a.rating < b.rating) {
                    return -1;
                }

                return 0;
            }) : state.videogames
            state.videogames = ratingorder
        },
        postvideogame: (state, { payload }) => {
            state.postgame = payload
        },
        putVideogame: (state, { payload }) => {
            state.putgame = payload
        },
        deleteVideogame: (state, { payload }) => {
            state.deletegame = payload
        },
        filandord: (state, { payload }) => {
            state.videogames = payload
        },
        orderVideogamesByName: (state, { payload }) => {
            const nameorder = payload === 'asd' ?
                state.videogames.sort(function (a, b) {
                    const onename = a.name.toLowerCase()
                    const twoname = b.name.toLowerCase()
                    if (onename > twoname) {
                        return 1;
                    }
                    if (onename < twoname) {
                        return -1;
                    }

                    return 0;
                })
                : payload === 'des' ? state.videogames.sort(function (a, b) {
                    const onename = a.name.toLowerCase()
                    const twoname = b.name.toLowerCase()
                    if (onename < twoname) {
                        return 1;
                    }
                    if (onename > twoname) {
                        return -1;
                    }
                    return 0;
                }) : state.videogames

            state.videogames = nameorder

        }
    }
})

export const {
    saveVideogames,
    idvideogame,
    orderVideogamesByRaiting,
    postvideogame,
    putVideogame,
    deleteVideogame,
    filandord,
    orderVideogamesByName
} = videogamesSlice.actions

export default videogamesSlice.reducer
