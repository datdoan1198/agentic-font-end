import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthAdminSuccess: false,
        authAdmin: {},
        isAuthUserSuccess: false,
        authUser: {}
    },
    reducers: {
        setAuthAdmin: (state, action) => ({
            ...state,
            isAuthAdminSuccess: action.payload.isAuthAdminSuccess,
            authAdmin: action.payload.data
        }),
        setAuthUser: (state, action) => ({
            ...state,
            isAuthUserSuccess: action.payload.isAuthUserSuccess,
            authUser: action.payload.data
        })

    }
})

export const {
    setAuthAdmin, setAuthUser
} = authSlice.actions

export default authSlice.reducer;
