import { createSlice } from "@reduxjs/toolkit"

// Slice cho link management
const linkSlice = createSlice({
  name: "link",
  initialState: {
    openModalDelete: false,
    selectedLink: null,
  },
  reducers: {
    handleOpenModalDelete: (state, action) => {
      return {
        ...state,
        openModalDelete: action.payload,
        selectedLink: action.payload,
      }
    },
    handleCloseModalDelete: (state) => {
      return {
        ...state,
        openModalDelete: false,
        selectedLink: null,
      }
    },
  },
})

export const { handleOpenModalDelete, handleCloseModalDelete } = linkSlice.actions
export default linkSlice.reducer
