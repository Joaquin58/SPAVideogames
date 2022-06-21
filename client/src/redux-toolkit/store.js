import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
// import rootReducer from './reducer'
import genres from './slices/genres.slice'
import videogames from "./slices/videogames.slice"
import platforms from "./slices/platforms.slice"
import general from "./slices/general.slice"

const store = configureStore({
    reducer: {
        videogames,
        genres,
        platforms,
        general
    },
    middleware: [thunk]
})

export default store
