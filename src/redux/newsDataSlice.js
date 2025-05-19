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
        applyFilterTriggered: false,
        browseBy: 'top-headlines',
        userChat: []
    },
    reducers: {
        appendNews: (state, action) => {
            // state.newsObject = [...state.newsObject, ...action.payload], //Currently skipped to store previous collected to prevent extra api calls
            state.newsObject = action.payload,
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
        },
        setBrowseBy: (state, action) => {
            state.browseBy = action.payload
            console.log("ac: ", action)
        },
        userAiChats: (state, action) => {

            console.log("action : ", action)

            // At initial array of object is coming
            if(Array.isArray(action.payload)) {
                state.userChat = action.payload                
            } else{
                // For single message Object is coming
                state.userChat.push(action.payload)
            }
        }
    }
})

export const {appendNews, appendFavNews, pageNumber,filteredNews, checkApplyFilterTriggered, setBrowseBy, userAiChats} = newsDataObjectSlice.actions

export default newsDataObjectSlice.reducer