import { createSlice } from "@reduxjs/toolkit";
import { UserAuthEntity } from "@entity";
import { USER_AUTH } from "@utils";

interface UserState { auth: UserAuthEntity | null }

const initialState: UserState = { auth: USER_AUTH() }

export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: initialState,
    reducers: { updateAuth: (state, action) => { state.auth = JSON.parse(action.payload) } }
})

export const { updateAuth } = userAuthSlice.actions

export default userAuthSlice.reducer