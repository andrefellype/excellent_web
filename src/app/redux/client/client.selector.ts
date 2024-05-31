import { ClientEntity } from "@entity";

export const clientSelector = (state: any) => state.client.client as ClientEntity | null
export const clientsSelector = (state: any) => state.client.clients as ClientEntity[]