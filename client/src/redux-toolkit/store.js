import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
// import rootReducer from './reducer'
import genres from './slices/index'

const store = configureStore({
    reducer: genres,
    middleware:[thunk]
})

export default store
