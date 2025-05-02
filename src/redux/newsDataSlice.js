import { createSlice } from "@reduxjs/toolkit";



export const newsDataObjectSlice = createSlice({
    name: 'newsData',
    initialState: {
        newsObject: [],
        favNewsObject : [],
        pageNumber: 0,
        filters :{
            language: [{ code: 'en', label: 'English' }],
            country: [{ code: 'in', label: 'India' }],
            categories: [{ code: 'general', label: 'general' }]
        },
        applyFilterTriggered: false
    },
    reducers: {
        appendNews: (state, action) => {
            state.newsObject = [...state.newsObject, ...action.payload],
            state.pageNumber = state.pageNumber + 1;
            
        },
        appendFavNews: (state, action) => {
            state.favNewsObject = action.payload
        },
        filteredNews: (state, action) => {
            const {selectedOptions, entityType} = action.payload;
            state.filters[entityType] = selectedOptions;
        },
        checkApplyFilterTriggered: (state, action) => {
            state.applyFilterTriggered = !action.payload
            console.log("action : ", action.payload)
        }
    }
})

export const {appendNews, appendFavNews, pageNumber,filteredNews, checkApplyFilterTriggered} = newsDataObjectSlice.actions

export default newsDataObjectSlice.reducer