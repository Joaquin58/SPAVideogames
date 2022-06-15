import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const videogames = createSlice({
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



export default videogames.reducer

export const {
    saveVideogames,
    idvideogame,
    orderVideogamesByRaiting,
    postvideogame,
    putVideogame,
    deleteVideogame,
    filandord,
    orderVideogamesByName
} = videogames.actions

//todo: actions
export const getVideogames = () => (dispatch) => {
    axios.get(`/videogames`).then(({ data }) => {

        dispatch(saveVideogames(data))
    }).catch(err => {
        dispatch(saveVideogames(['error']))
    });
}

export const getVideogameById = (id) => (dispatch) => {
    if (!id) dispatch(idvideogame(undefined))
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
    axios.post(`/filtandorder`, filters).then(({ data }) => {
        dispatch(filandord(data))
    }).catch(() => {
        dispatch(filandord([]))
    })
}