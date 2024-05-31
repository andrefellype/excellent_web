import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    msg: {
        title?: string | null, icon?: "success" | "error" | "warning" | "info" | "question" | null,
        type: "message" | "fail_page", msgs: string[], confirmText: string | null, uppercase?: boolean
    }
} = { msg: { title: null, icon: null, type: "message", msgs: [], confirmText: null, uppercase: true } }

export const configurationMessageSlice = createSlice({
    name: "configurationMessage", initialState, reducers: { updateMsgReducer: (state, action) => { state.msg = action.payload } }
});

export const { updateMsgReducer } = configurationMessageSlice.actions

export default configurationMessageSlice.reducer
