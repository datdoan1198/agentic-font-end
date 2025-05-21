import { createSlice } from '@reduxjs/toolkit'

const botSlice = createSlice({
  name: 'bot',
  initialState: {
    botChats: [],
    // ========= DELETE BOT ========== //
    isLoadingDeleteBot: false,
    // ========== LINKS ========== //
    links: [],
    isLoadingGetLinks: false,
    paginationLinks: {
      total: 0,
      per_page: 10,
      page: 1,
    },
    // ========== CREATE LINK ========== //
    isLoadingCreateLink: false,
    // ========== DELETE LINK ========== //
    isLoadingDeleteLink: false,
    // ========== VIEW LINK CONTENT ========== //
    isLoadingViewLinkContent: false,
    linkContent: null,
    // RE-SCAN
    isLoadingRescanLink: false,
  },
  reducers: {
    setBotChats: (state, action) => ({
      ...state,
      botChats: action.payload,
    }),
    // ========= DELETE BOT ========== //
    requestDeleteBot: (state) => ({
      ...state,
      isLoadingDeleteBot: true,
    }),
    deleteBotSuccess: (state, action) => ({
      ...state,
      botChats: state.botChats.filter((bot) => bot._id !== action.payload.data.bot_id),
      isLoadingDeleteBot: false,
    }),
    deleteBotFailed: (state) => ({
      ...state,
      isLoadingDeleteBot: false,
    }),
    // ========== GET LINKS ========== //
    requestGetLinks: (state) => ({
      ...state,
      isLoadingGetLinks: true,
    }),
    getLinksSuccess: (state, action) => ({
      ...state,
      links: action.payload.data.links,
      paginationLinks: {
        total: action.payload.data.total,
        per_page: action.payload.data.per_page,
        page: action.payload.data.page,
      },
      isLoadingGetLinks: false,
    }),
    getLinksFailed: (state) => ({
      ...state,
      isLoadingGetLinks: false,
    }),
    // ========== CREATE LINK ========== //
    requestCreateLink: (state) => ({
      ...state,
      isLoadingCreateLink: true,
    }),
    createLinkSuccess: (state) => ({
      ...state,
      isLoadingCreateLink: false,
    }),
    createLinkFailed: (state) => ({
      ...state,
      isLoadingCreateLink: false,
    }),
    // ========== DELETE LINK ========== //
    requestDeleteLink: (state) => ({
      ...state,
      isLoadingDeleteLink: true,
    }),
    deleteLinkSuccess: (state) => ({
      ...state,
      isLoadingDeleteLink: false,
    }),
    deleteLinkFailed: (state) => ({
      ...state,
      isLoadingDeleteLink: false,
    }),
    // ========== VIEW LINK CONTENT ========== //
    requestViewLinkContent: (state) => ({
      ...state,
      isLoadingViewLinkContent: true,
    }),
    viewLinkContentSuccess: (state, action) => ({
      ...state,
      linkContent: action.payload.data,
      isLoadingViewLinkContent: false,
    }),
    viewLinkContentFailed: (state) => ({
      ...state,
      isLoadingViewLinkContent: false,
    }),
    // ========== RE-SCAN LINK ========== //
    requestRescanLink: (state) => ({
      ...state,
      isLoadingRescanLink: true,
    }),
    rescanLinkSuccess: (state) => ({
      ...state,
      isLoadingRescanLink: false,
    }),
    rescanLinkFailed: (state) => ({
      ...state,
      isLoadingRescanLink: false,
    }),
  },
})

export const {
  // ========== BOT CHAT ========== //
  setBotChats,
  // DELETE BOT
  requestDeleteBot,
  deleteBotSuccess,
  deleteBotFailed,
  // GET LINKS
  requestGetLinks,
  getLinksSuccess,
  getLinksFailed,
  // CREATE LINK
  requestCreateLink,
  createLinkSuccess,
  createLinkFailed,
  // DELETE LINK
  requestDeleteLink,
  deleteLinkSuccess,
  deleteLinkFailed,
  // VIEW LINK CONTENT
  requestViewLinkContent,
  viewLinkContentSuccess,
  viewLinkContentFailed,
  // RE-SCAN LINK
  requestRescanLink,
  rescanLinkSuccess,
  rescanLinkFailed,
} = botSlice.actions

export default botSlice.reducer
