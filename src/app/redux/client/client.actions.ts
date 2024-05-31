import { ClientEntity } from "@entity"
import { updateClient, updateClients } from "./client.reducer"

export const updateClientAction = (dispatch: any, value: ClientEntity | null) => { dispatch(updateClient(JSON.stringify(value))) }
export const updateClientsAction = (dispatch: any, value: ClientEntity[]) => { dispatch(updateClients(JSON.stringify(value))) }