import { UserEntity } from "@entity";

export const userSelector = (state: any) => state.user.user as UserEntity | null
export const usersSelector = (state: any) => state.user.users as UserEntity[]