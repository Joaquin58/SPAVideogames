import {
  GET_VGS,
  FLV_BYGN,
  GET_GN,
  FL_DBVG,
  // ORD_BYNM,
  GET_VG,
  GET_VG_BY_ID,
  ORD_BYRT,
  POST_VG,
  GET_PT,
  ORD_BYNMBK,
  SAVENAME,
  FLV_BYGNBK,
  ORDER_TYPE,
  // nameparamas
  
} from './actions'

const initialState = {
  allVideogames: [],
  videogames: [],
  genres: [],
  idvideogame: [],
  plataformas: [],
  savename: '',
  ordertype: ''
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
    
    case FL_DBVG:
      const allvideogames = state.allVideogames
      const cratedfilter = payload === 'Created' ? allvideogames.filter(el => el.CreatedInDb === true)
        : payload === 'All' ? state.allVideogames
          : allvideogames.filter(el => el.CreatedInDb === false)
      return {
        ...state, videogames: cratedfilter
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
        
        return 0;
      }) : state.videogames.sort(function (a, b) {
        if (a.rating > b.rating) {
          return 1;
        }
        if (a.rating < b.rating) {
          return -1;
        }
      
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
    case ORD_BYNMBK:
      return {
        ...state, videogames: payload
      }
    case SAVENAME:
      return {
        ...state,
        savename: payload
      }
      // case FLV_BYGN:
      //   return {
      //     ...state, videogames: payload
      //   }
      case FLV_BYGNBK:
        return {
          ...state, videogames: payload
        }
        case ORDER_TYPE:
          return{
            ...state, ordertype: payload
          }
          // case nameparamas:
          //   return{
          //     ...state, videogames: payload
          //   }
    default:
      return state;
  }
};

export default rootReducer;