import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: 'app',
  initialState: {
    breadcrumb: [],
    isShowSideBar: window.innerWidth <= 576 ? false : true,
    location: {
      pathName: '',
      prevPathName: '',
      params: {},
      query: {}
    },
    title: " ",
    goToPage: {
      path: "",
      redirected: true
    },
    pullDownLoading: false
  },
  reducers: {
    setBreadcrumb: (state, action) => ({
      ...state,
      breadcrumb: action.payload
    }),
    setLocation: (state, action) => ({
      ...state,
      location: {
        pathName: action.payload.pathName,
        prevPathName: action.payload.prevPathName || null,
        params: { ...(action.payload.params || {}) },
        query: { ...(action.payload.query || {}) }
      }
    }),
    setTitlePage: (state, action) => ({
      ...state,
      title: action.payload
    }),
    handleSetIsShowSideBar: (state, action) => ({
      ...state,
      isShowSideBar: action.payload
    }),
    goToPage: (state, action) => ({
      ...state,
      goToPage: {
        path: action.payload.path,
        redirected: false
      }
    }),
    goToPageSuccess: (state) => ({
      ...state,
      goToPage: {
        ...state.goToPage,
        redirected: true
      }
    }),
    setPullDownLoading : (state, action) => ({
      ...state,
      pullDownLoading: action.payload
    }),
  }
})

export const {
  goToPage, goToPageSuccess,
  handleSetIsShowSideBar,
  setBreadcrumb, setLocation, setTitlePage,
  setPullDownLoading
} = appSlice.actions

export default appSlice.reducer;
