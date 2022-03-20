import axios from 'axios';
export const GET_VGS = 'GET_VGS'                //* Todos los juegos
export const GET_VG = 'GET_VG'                  //* Un solo juego que coincidan con un nombre
export const GET_VG_BY_ID = 'GET_VG_BY_ID'      //* Un solo juego por id
export const GET_GN = 'GET_GN'                  //* Todos los generos
export const POST_VG = 'POST_VG'                //* Postear un juego
export const FL_DBVG = 'FL_DBVG'                //* Filtro de los juegos creados por el usuario
// export const FLV_BYGN = 'FLV_BYGN'              //* Filtro por genero
export const ORD_BYNM = 'ORD_BYNM'              //* ordenado por nombre
export const ORD_BYRT = 'ORD_BYRT'              //* ordenado por nombre
export const GET_PT = 'GET_PT'                  //* obtener plataformas desponibles
export const ORD_BYNMBK = 'ORD_BYNMBK'
export const SAVENAME = 'SAVENAME'
export const FLV_BYGNBK = 'FLV_BYGNBK'
export const ORDER_TYPE = 'ORDER_TYPE'

// export const nameparamas = 'nameparamas'

// const URL = 'http://localhost:3001'


export const getVideogames = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/videogames`)
            const payload = response.data
            return dispatch({ type: GET_VGS, payload })
        } catch (err) {
            return dispatch({ type: GET_VGS, payload: ['error'] })
        }
    }
}

export const getVideogameByName = (name) => {
    return async (dispatch) => {
        const response = await axios.get(`/videogames?name=${name}`)
        const payload = response.data
        dispatch({ type: GET_VG, payload })
    }
}

// export const Getvideogamesbynameparamam = (name)=>{
//     return async(dispatch) =>{
//         const response = await axios.get(`/videogames/${name}`)
//         const payload = response.data
//         dispatch({type:nameparamas, payload })
//     }
// }

export const getVideogameById = (id) => {
    return async (dispatch) => {
        if (id) {
            try {
                const response = await axios.get(`/videogames/${id}`)
                const payload = response.data
                if (payload) {
                    dispatch({ type: GET_VG_BY_ID, payload })

                } else {
                    dispatch({ type: GET_VG_BY_ID, payload: null })
                }

            } catch {
                dispatch({ type: GET_VG_BY_ID, payload: null })
            }
        } else {
            dispatch({ type: GET_VG_BY_ID, payload: undefined })
        }

    }
}

export const getGenres = () => {
    return async (dispatch) => {
        const response = await axios.get(`/genres`)
        const payload = response.data

        dispatch({ type: GET_GN, payload })
    }
}

export const postVideogame = (body) => {
    return async (dispatch) => {
        const increate = await axios.post(`/videogame`, body);
        const payload = await increate.data;
        dispatch({ type: POST_VG, payload })
    }
}


export const filterVideogamesCreated = (payload) => {
    return {
        type: FL_DBVG, payload
    }
}

export const orderVideogamesByRaiting = (payload) => {
    return {
        type: ORD_BYRT, payload
    }
}

export const getPlatforms = () => {
    return async (dispatch) => {
        const response = await axios.get(`/platforms`)
        const payload = response.data
        dispatch({ type: GET_PT, payload })
    }
}

export const orderVideogamesByNameBk = (name, order) => {
    return async (dispatch) => {
        if (!name) {
            try {

                const response = await axios.get(`/videogames?order=${order}`)
                const payload = response.data
                return dispatch({ type: ORD_BYNMBK, payload })
            } catch (err) {
                return dispatch({ type: ORD_BYNMBK, payload: err })
            }
        } else if (name && order) {
            const response = await axios.get(`/videogames?name=${name}&order=${order}`)
            const payload = response.data
            dispatch({ type: ORD_BYNMBK, payload })
        }
    }
}
export const filterVideogamesAndNameBk = (name, order, filtro) => {
    return async (dispatch) => {
        if (!(name || order || filtro)) {
            try {
                const response = await axios.get(`/videogames`)
                const payload = response.data
                return dispatch({ type: FLV_BYGNBK, payload })
            } catch (err) {
                return dispatch({ type: FLV_BYGNBK, payload: ['error'] })
            }
        } else if (name || order || filtro) {
            try {
                const response = await axios.get(`/videogames?name=${name?name:''}&order=${order?order:''}&filtro=${filtro?filtro:''}`)
                const payload = response.data
                return dispatch({ type: FLV_BYGNBK, payload })
            } catch (error) {

            }
        }

    }
}

export const orderchange = (payload) => {
    if (payload === undefined) {
        return { type: ORDER_TYPE, payload:'' }
    } else {
        return { type: ORDER_TYPE, payload }
    }
}

export const saveName = (payload) => {
    return {
        type: SAVENAME, payload
    }
}