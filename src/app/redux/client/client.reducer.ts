import { createSlice } from "@reduxjs/toolkit";
import { ClientEntity } from "@entity";

interface ClientState { client: ClientEntity | null, clients: ClientEntity[] }

const initialState: ClientState = { client: null, clients: [] }

export const clientSlice = createSlice({
    name: "client",
    initialState: initialState,
    reducers: {
        updateClient: (state, action) => { state.client = JSON.parse(action.payload) },
        updateClients: (state, action) => { state.clients = JSON.parse(action.payload) }
    }
})

export const { updateClient, updateClients } = clientSlice.actions

export default clientSlice.reducer