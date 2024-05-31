import { UserAuthEntity } from "@entity";
import { updateAuth } from "./auth.reducer";

export const updateAuthAction = (dispatch: any, value: UserAuthEntity | null) => { dispatch(updateAuth(JSON.stringify(value))) }