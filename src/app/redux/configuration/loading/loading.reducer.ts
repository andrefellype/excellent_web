import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    loading: { title?: string | null; status: boolean }
    loadingTable: { title?: string | null; status: boolean }
} = {
    loading: { title: null, status: false },
    loadingTable: { title: null, status: false }
}

const configurationLoadingSlice = createSlice({
    name: "configurationLoading", initialState, reducers: {
        loadingUpdateReducer: (state, action) => { state.loading = action.payload },
        loadingTableUpdateReducer: (state, action) => { state.loadingTable = action.payload }
    }
});

export const { loadingUpdateReducer, loadingTableUpdateReducer } = configurationLoadingSlice.actions

export default configurationLoadingSlice.reducer
