import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthAdminSuccess: false,
        authAdmin: {
            x_name: ''
        }
    },
    reducers: {
        setAuthAdmin: (state, action) => ({
            ...state,
            isAuthAdminSuccess: action.payload.isAuthAdminSuccess,
            authAdmin: action.payload.data
        })

    }
})

export const {
    setAuthAdmin,
} = authSlice.actions

export default authSlice.reducer;
