import { createSlice } from "@reduxjs/toolkit";

const linkSlice = createSlice({
  name: "link",
  initialState: {
    linkSelected: {},
    openModalDelete: false,
  },
  reducers: {
    setLinkSelected: (state, action) => ({
      ...state,
      linkSelected: action.payload,
    }),
    handleCloseModalDelete: (state) => {
      state.openModalDelete = false;
    },
    handleOpenModalDelete: (state, action) => {
      state.openModalDelete = true;
      state.linkSelected = action.payload;
    },
  },
});

export const { setLinkSelected, handleCloseModalDelete, handleOpenModalDelete } = linkSlice.actions;

export default linkSlice.reducer;
