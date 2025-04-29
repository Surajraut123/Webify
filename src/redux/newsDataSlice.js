import { createSlice } from "@reduxjs/toolkit";



export const newsDataObjectSlice = createSlice({
    name: 'newsData',
    initialState: {
        newsObject: [],
        favNewsObject : [],
        pageNumber: 0
    },
    reducers: {
        appendNews: (state, action) => {
            state.newsObject = [...state.newsObject, ...action.payload],
            state.pageNumber = state.pageNumber + 1;
            console.log("called hre now pageNumber is  : ", state.pageNumber)
        },
        appendFavNews: (state, action) => {
            state.favNewsObject = action.payload
        }
    }
})

export const {appendNews, appendFavNews, pageNumber} = newsDataObjectSlice.actions

export default newsDataObjectSlice.reducer