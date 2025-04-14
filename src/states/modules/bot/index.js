import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: 'bot',
    initialState: {
        botChats: []
    },
    reducers: {
        setBotChats: (state, action) => ({
            ...state,
            botChats: action.payload
        })
    }
})

export const {
    setBotChats
} = homeSlice.actions

export default homeSlice.reducer;
