import { UserEntity, UserAuthEntity } from "@entity";

export interface UserRepository {
    openOneById(id: number, token: string): Promise<UserEntity>
    all(userAuth: UserAuthEntity): Promise<UserEntity[]>
    updateEnabledById(id: number, token: string): Promise<void>
    deleteById(id: number, token: string): Promise<void>
    deleteByIds(ids: number[], token: string): Promise<void>
    register(params: { name: string, cellphone: string, password: string, password_confirm: string, is_admin: boolean }, token: string): Promise<void>
}