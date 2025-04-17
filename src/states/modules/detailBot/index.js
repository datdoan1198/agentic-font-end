import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: 'detailBot',
    initialState: {
        isShowSideBar: true,
        bot: {}
    },
    reducers: {
        setIsShowSideBar: (state, action) => ({
            ...state,
            isShowSideBar: action.payload
        }),
        setBot: (state, action) => ({
            ...state,
            bot: action.payload
        })
    }
})

export const {
    setIsShowSideBar, setBot
} = homeSlice.actions

export default homeSlice.reducer;
