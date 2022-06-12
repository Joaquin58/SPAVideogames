import { createReducer } from "@reduxjs/toolkit";
import {
    getVideogames,
    getGenres,
    getVideogameById,
    orderVideogamesByRaiting,
    postVideogame,
    getPlatforms,
    saveName,
    orderchange,
    savePage,
    updateGame,
    deletegame,
    filterandorder,
    orderVideogamesByName,
} from './actions'



export const initialState = {
    allVideogames: [],
    videogames: [],
    genres: [],
    idvideogame: [],
    plataformas: [],
    savename: '',
    ordertype: '',
    statePag: '',
    loading: true
}


const rootReducer = createReducer(initialState, builder =>
    builder
        .addCase(getVideogames.fulfilled, (state, { payload }) => {
            return {
                ...state,
                videogames: payload,
                allVideogames: payload,
                loading: false
            }
        })
        .addCase(getGenres.fulfilled, (state, { payload }) => {
            return {
                ...state,
                loading: false,
                genres: payload
            }
        })
        .addCase(getVideogameById.fulfilled, (state, { payload }) => {
            return {
                ...state,
                idvideogame: payload
            }
        })
        .addCase(orderVideogamesByRaiting, (state, { payload }) => {
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
            return {
                ...state,
                videogames: ratingorder
            }
        })
        .addCase(postVideogame.fulfilled, (state, { payload }) => {
            return {
                ...state
            }
        })
        .addCase(getPlatforms.fulfilled, (state, { payload }) => {
            return {
                ...state,
                plataformas: payload
            }
        })
        .addCase(saveName, (state, { payload }) => {
            return {
                ...state,
                savename: payload
            }
        })
        .addCase(orderchange, (state, { payload }) => {
            return {
                ...state,
                ordertype: payload
            }
        })
        .addCase(savePage, (state, { payload }) => {
            return {
                ...state,
                statePag: payload
            }
        })
        .addCase(updateGame.fulfilled, (state, { payload }) => {
            return {
                ...state
            }
        })
        .addCase(deletegame.fulfilled, (state, { payload }) => {
            return {
                ...state
            }
        })
        .addCase(filterandorder, (state, { payload }) => {
            return {
                ...state,
                videogames: payload
            }
        })
        .addCase(orderVideogamesByName, (state, { payload }) => {
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
            return {
                ...state, videogames: nameorder
            }
        })
        .addDefaultCase((state, { payload }) => {
            return state
        })

)

export default rootReducer;
