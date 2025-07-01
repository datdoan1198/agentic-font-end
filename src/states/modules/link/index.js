import {createSlice} from "@reduxjs/toolkit"

// Slice cho link management
const linkSlice = createSlice({
    name: "link",
    initialState: {
        openModalDelete: false,
        selectedLink: null,
        loadingRowIds: [],
        pagination: {
            keySearch: "",
            page: 1,
            perPage: 10,
            status: "",
        }
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
        setLoadingRowIds: (state, action) => ({
            ...state,
            loadingRowIds: action.payload
        }),
        setPagination: (state, action) => ({
            ...state,
            pagination: action.payload
        })
    },
})

export const {
    handleOpenModalDelete,
    handleCloseModalDelete,
    setLoadingRowIds, setPagination
} = linkSlice.actions
export default linkSlice.reducer
