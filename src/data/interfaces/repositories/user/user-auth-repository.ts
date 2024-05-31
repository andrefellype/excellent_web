import { UserAuthEntity } from "@entity";

export interface UserAuthRepository {
    signIn(params: { cellphone: string, password: string }): Promise<UserAuthEntity>
    signUp(params: { name: string, cellphone: string, password: string, password_confirm: string }): Promise<UserAuthEntity>
    refreshToken(token: string): Promise<UserAuthEntity | null>
    signOut(token: string): Promise<void>
    updateAllById(id: number, params: { name: string, cellphone: string }, token: string): Promise<UserAuthEntity | null>
    updatePasswordById(id: number, params: { password: string, password_confirm: string }, token: string): Promise<UserAuthEntity | null>
}