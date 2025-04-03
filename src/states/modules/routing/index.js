import { createSlice } from "@reduxjs/toolkit";

const routingSlice = createSlice({
  name: 'routing',
  initialState: {},
  reducers: {
    initialSaga: (state) => ({ ...state })
  }
})

export const {
  initialSaga
} = routingSlice.actions

export default routingSlice.reducer;
