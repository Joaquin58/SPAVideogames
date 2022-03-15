import axios from 'axios';
export const GET_VGS = 'GET_VGS'                //* Todos los juegos
export const GET_VG = 'GET_VG'                  //* Un solo juego que coincidan con un nombre
export const GET_VG_BY_ID = 'GET_VG_BY_ID'      //* Un solo juego por id
export const GET_GN = 'GET_GN'                  //* Todos los generos
export const POST_VG = 'POST_VG'                //* Postear un juego
export const FL_DBVG = 'FL_DBVG'                //* Filtro de los juegos creados por el usuario
export const FLV_BYGN = 'FLV_BYGN'              //* Filtro por genero
export const ORD_BYNM = 'ORD_BYNM'              //* ordenado por nombre
export const ORD_BYRT = 'ORD_BYRT'              //* ordenado por nombre
export const GET_PT = 'GET_PT'                  //* obtener plataformas desponibles


const URL = 'http://localhost:3001'


export const getVideogames = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${URL}/videogames`)
            const payload = response.data

            return dispatch({ type: GET_VGS, payload })
        } catch (err) {
            return dispatch({ type: GET_VGS, payload: ['error'] })
        }
    }
}

export const getVideogameByName = (name) => {
    return async (dispatch) => {
        const response = await axios.get(`${URL}/videogames?name=${name}`)
        const payload = response.data
        dispatch({ type: GET_VG, payload })
    }
}

export const getVideogameById = (id) => {
    return async (dispatch) => {
        if (id) {
            try {
                const response = await axios.get(`${URL}/videogames/${id}`)
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
        const response = await axios.get(`${URL}/genres`)
        const payload = response.data

        dispatch({ type: GET_GN, payload })
    }
}

export const postVideogame = (body) => {
    return async (dispatch) => {
        const increate = await axios.post(`${URL}/videogame`, body);
        const payload = await increate.data;
        dispatch({ type: POST_VG, payload })
    }
}

export const filterVideogamesByGenres = (payload) => {
    return {
        type: FLV_BYGN, payload
    }
}

export const filterVideogamesCreated = (payload) => {
    return {
        type: FL_DBVG, payload
    }
}

export const orderVideogamesByName = (payload) => {
    return {
        type: ORD_BYNM, payload
    }
}

export const orderVideogamesByRaiting = (payload) => {
    return{
        type:ORD_BYRT, payload
    }
}

export const getPlatforms = () => {
    return async (dispatch) => {
        const response = await axios.get(`${URL}/platforms`)
        const payload = response.data
        dispatch({ type: GET_PT, payload })
    }
}
