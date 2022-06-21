import axios from "axios";
import { generalSilce } from "./slices/general.slice"
import { getAllGenres } from "./slices/genres.slice"
import { savePlatforms } from "./slices/platforms.slice"
import {
    saveVideogames,
    idvideogame,
    postvideogame,
    putVideogame,
    deleteVideogame,
    filandord,
    videogamesSlice
} from "./slices/videogames.slice"

export const {
    orderchange,
    saveName,
    savePage
} = generalSilce.actions

export const { orderVideogamesByName, orderVideogamesByRaiting } = videogamesSlice.actions

export const getGenres = () => (dispatch) => {
    axios.get(`/genres`).then(({ data }) => {
        dispatch(getAllGenres(data))
    }).catch(err => console.log(err))
}

export const getPlatforms = () => (dispatch) => {
    axios.get(`/platforms`).then(({ data }) => {
        dispatch(savePlatforms(data))
    }).catch(() => {
        dispatch(savePlatforms([]))
    })
}

export const getVideogames = () => (dispatch) => {
    axios.get(`/videogames`).then(({ data }) => {

        dispatch(saveVideogames(data))
    }).catch(err => {
        dispatch(saveVideogames(['error']))
    });
}

export const getVideogameById = (id) => (dispatch) => {
    if (!id) dispatch(idvideogame([]))
    axios.get(`/videogames/${id}`).then(({ data }) => {
        if (data) dispatch(idvideogame(data))
        else return null
    }).catch(err => err)
}


// !trello
export const postVideogame = (data) => (dispatch) => {
    axios.post(`/videogame`, data).then(({ data }) => {
        dispatch(postvideogame(true))
        return
    }).catch(err => {
        dispatch(postVideogame(false))
    })
}

//!manejo de errores
export const updateGame = (id, input) => (dispatch) => {
    axios.put(`/update/${id}`, input).then(({ data }) => {
        dispatch(putVideogame(true))
    }).catch(err => {
        dispatch(postVideogame(false))
    })
}

export const deletegame = (id) => (dispatch) => {
    axios.delete(`/delete/${id}`).then(({ data }) => {
        dispatch(deleteVideogame(true))
    })
}

export const filterandorder = (filters) => (dispatch) => {
    if (filters.name === '' && filters.status === "Filtra por existente o creado" && filters.genres === "Filtra por generos") {
        let { alfabet } = filters
        dispatch(orderVideogamesByName(alfabet))
        let { rating } = filters
        dispatch(orderVideogamesByRaiting(rating))
    } else {
        axios.post(`/filtandorder`, filters).then(({ data }) => {
            dispatch(filandord(data))
            let { alfabet } = filters
            dispatch(orderVideogamesByName(alfabet))
            let { rating } = filters
            dispatch(orderVideogamesByRaiting(rating))
        }).catch(() => {
            dispatch(filandord('error'))
        })
    }
}