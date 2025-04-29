import { configureStore } from "@reduxjs/toolkit";
import dataReducer from './newsDataSlice'

const store = configureStore({
    reducer: {
        newsData: dataReducer
    }
})

export default store;