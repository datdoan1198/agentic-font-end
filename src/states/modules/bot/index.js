import { createSlice } from "@reduxjs/toolkit"

const botSlice = createSlice({
  name: "bot",
  initialState: {
    botChats: [],
    // ========== LINKS ========== //
    links: [],
    isLoadingGetLinks: false,
    paginationLinks: null,
  },
  reducers: {
    setBotChats: (state, action) => ({
      ...state,
      botChats: action.payload,
    }),
    requestGetLinks: (state) => ({
      ...state,
      isLoadingGetLinks: true,
    }),
    getLinksSuccess: (state, action) => {
      return {
        ...state,
        links: action.payload.data.links,
        paginationLinks: {
          total: action.payload.total,
          per_page: action.payload.per_page,
          page: action.payload.page,
        },
        isLoadingGetLinks: false,
      }
    },
    getLinksFailed: (state) => ({
      ...state,
      isLoadingGetLinks: false,
    }),
  },
})

export const { setBotChats, requestGetLinks, getLinksSuccess, getLinksFailed } = botSlice.actions

export default botSlice.reducer
