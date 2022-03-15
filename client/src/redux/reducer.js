import {
  GET_VGS,
  FLV_BYGN,
  GET_GN,
  FL_DBVG,
  ORD_BYNM,
  GET_VG,
  GET_VG_BY_ID,
  ORD_BYRT,
  POST_VG,
  GET_PT
} from './actions'

const initialState = {
  allVideogames: [],
  videogames: [],
  genres: [],
  idvideogame: [],
  plataformas: []
}


const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_VGS:
      return {
        ...state,
        videogames: payload,
        allVideogames: payload
      }
    case GET_GN:

      return {
        ...state, genres: payload
      }
    case FLV_BYGN:
      const allVideogames = state.allVideogames

      const genresfilter = payload === 'ALL' ? allVideogames : allVideogames.filter(el => el.genres.includes(payload))
      return {
        ...state,
        videogames: genresfilter
      }
    case FL_DBVG:
      const allvideogames = state.allVideogames
      const cratedfilter = payload === 'Created' ? allvideogames.filter(el => el.CreatedInDb === true) 
      : payload === 'All' ? state.allVideogames 
      : allvideogames.filter(el => el.CreatedInDb === false)
      return {
        ...state, videogames: cratedfilter
      }
    case ORD_BYNM:
      const nameorder = payload === 'asd' ? state.videogames.sort(function (a, b) {
        const onename = a.name.toLowerCase()
        const twoname = b.name.toLowerCase()
        if (onename > twoname) {
          return 1;
        }
        if (onename < twoname) {
          return -1;
        }

        return 0;
      }) : state.videogames.sort(function (a, b) {
        const onename = a.name.toLowerCase()
        const twoname = b.name.toLowerCase()

        if (onename < twoname) {
          return 1;
        }
        if (onename > twoname) {
          return -1;
        }

        return 0;
      })
      return {
        ...state, videogames: nameorder
      }
    case GET_VG:
      return {
        ...state, videogames: payload
      }
    case GET_VG_BY_ID:
      return {
        ...state, idvideogame: payload
      }
    case ORD_BYRT:
      const ratingorder = payload === 'max' ? state.videogames.sort(function (a, b) {
        if (a.rating < b.rating) {
          return 1;
        }
        if (a.rating > b.rating) {
          return -1;
        }
        // a must be equal to b
        return 0;
      }) : state.videogames.sort(function (a, b) {
        if (a.rating > b.rating) {
          return 1;
        }
        if (a.rating < b.rating) {
          return -1;
        }
        // a must be equal to b
        return 0;
      })
      return {
        ...state, 
        videogames: ratingorder
      }
    case POST_VG:
      return {
        ...state
      }
    case GET_PT:
      return {
        ...state, 
        plataformas: payload
      }
    default:
      return state;
  }
};

export default rootReducer;