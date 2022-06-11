import { createReducer } from "@reduxjs/toolkit";
import {
    getasyncgames,
    getGenres,
    vaciarestado
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
        .addCase(getasyncgames.fulfilled, (state, { payload }) => {
            return {
                ...state,
                videogames: payload,
                allVideogames: payload
            }
        })
        .addCase(getGenres.fulfilled, (state, { payload }) => {
            return {
                ...state,
                loading: false,
                genres: payload
            }
        }).addCase(getGenres.rejected, (state, { payload }) => {
            return {
                ...state,
                genres: [],
                loading: true
            }
        })
        .addCase(vaciarestado, (state, { payload }) => {
            return {
                ...state,
                genres: payload
            }
        })
        
)

export default rootReducer;
