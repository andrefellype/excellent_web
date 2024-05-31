import { UserEntity } from "@entity";
import { updateUser, updateUsers } from "./user.reducer";

export const updateUserAction = (dispatch: any, value: UserEntity | null) => { dispatch(updateUser(JSON.stringify(value))) }
export const updateUsersAction = (dispatch: any, value: UserEntity[]) => { dispatch(updateUsers(JSON.stringify(value))) }