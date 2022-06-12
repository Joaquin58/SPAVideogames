import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
    GET_VGS,
    GET_GN,
    GET_VG_BY_ID,
    POST_VG,
    ORD_BYRT,
    GET_PT,
    ORDER_TYPE,
    SAVENAME,
    PAG_UPDATE,
    UPDATE_GAME,
    DELETE_GAME,
    ORD_BYNM
} from './consts';
import axios from 'axios';
import { FILT_AND_ORDER } from '../redux/actions';




export const getVideogames = createAsyncThunk(GET_VGS, async () => {
    try {
        const { data } = await axios.get(`/videogames`)
        const payload = data
        return payload
    } catch (err) {
        return ['error']
    }
})

export const getVideogameById = createAsyncThunk(GET_VG_BY_ID, async (id) => {
    if (!id) return undefined
    try {
        const { data } = await axios.get(`/videogames/${id}`)
        if (data) return data
        else return null
    } catch (error) {
        return null
    }
})

export const getGenres = createAsyncThunk(GET_GN, async () => {
    const { data } = await axios.get(`/genres`)
    const payload = data
    return payload
})

// !trello
export const postVideogame = createAsyncThunk(POST_VG, async (body) => {
    const { data } = await axios.post(`/videogame`, body);
    return data
})

export const orderVideogamesByRaiting = createAction(ORD_BYRT, payload => payload)

export const getPlatforms = createAsyncThunk(GET_PT, async () => {
    const { data } = await axios.get(`/platfoms`);
    return data
})

export const orderchange = createAction(ORDER_TYPE, payload => payload ? "" : payload)

export const saveName = createAction(SAVENAME, payload => payload)

export const savePage = createAction(PAG_UPDATE, payload => payload)

export const updateGame = createAsyncThunk(UPDATE_GAME, async (id, input) => {
    const { data } = await axios.put(`/update/${id}`, input)
    return data
})

export const deletegame = createAsyncThunk(DELETE_GAME, async (id) => {
    const { data } = await axios.delete(`/delete/${id}`)
    return data
})

export const filterandorder = createAsyncThunk(FILT_AND_ORDER, async (filters) => {
    try {
        const { data } = await axios.post(`/filtandorder`, filters)
        return data
    } catch (error) {
        return []
    }
})

export const orderVideogamesByName = createAction(ORD_BYNM, payload => payload)