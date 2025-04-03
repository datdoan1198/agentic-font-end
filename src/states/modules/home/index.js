import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
    name: 'home',
    initialState: {},
    reducers: {}
})

// eslint-disable-next-line no-empty-pattern
export const {} = homeSlice.actions

export default homeSlice.reducer;