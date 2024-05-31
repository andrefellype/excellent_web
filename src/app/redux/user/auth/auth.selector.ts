import { UserAuthEntity } from "@entity";

export const userAuthSelector = (state: any) => state.userAuth.auth as UserAuthEntity | null