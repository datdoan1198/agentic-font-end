import { createSlice } from "@reduxjs/toolkit";

const routingSlice = createSlice({
  name: 'routing',
  initialState: {},
  reducers: {
    initialSaga: (state) => ({ ...state }),
  goToPage: (state) => ({ ...state }),
  }
})

export const {
  initialSaga, goToPage
} = routingSlice.actions

export default routingSlice.reducer;
