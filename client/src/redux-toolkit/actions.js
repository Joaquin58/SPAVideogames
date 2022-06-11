import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_VGS, GET_GN, VACIAR_ESTADO } from './consts';
import axios from 'axios';




export const getasyncgames = createAsyncThunk(GET_VGS, async () => {
    try {
        const { data } = await axios.get(`/videogames`)
        const payload = data
        return payload
    } catch (err) {
        return ['error']
    }
}
)

export const getGenres = createAsyncThunk(GET_GN, async () => {
    const { data } = await axios.get(`/genres`)
    const payload = data

    return payload
    // dispatch({ type: GET_GN, payload })
})

export const vaciarestado = createAction(VACIAR_ESTADO, () => {
    return []
})