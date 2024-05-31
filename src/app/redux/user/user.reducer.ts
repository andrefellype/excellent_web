import { createSlice } from "@reduxjs/toolkit";
import { UserEntity } from "@entity";

interface UserState { user: UserEntity | null, users: UserEntity[] }

const initialState: UserState = { user: null, users: [] }

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        updateUser: (state, action) => { state.user = JSON.parse(action.payload) },
        updateUsers: (state, action) => { state.users = JSON.parse(action.payload) }
    }
})

export const { updateUser, updateUsers } = userSlice.actions

export default userSlice.reducer