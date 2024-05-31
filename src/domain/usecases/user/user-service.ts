import { UserRepository } from "@data/interfaces/repositories";
import { UserEntity, UserAuthEntity } from "@entity";
import { GetLocalStorage, VALUES_APP } from "@utils";

export class UserServiceImpl {
    private userRepository: UserRepository
    constructor(userRepository: UserRepository) { this.userRepository = userRepository }

    async openOneById(id: number): Promise<UserEntity> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.userRepository.openOneById(id, userAuth.token).then(valueUser => resolve(valueUser)).catch(e => reject(e))
            }
        })
    }

    async all(): Promise<UserEntity[]> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.userRepository.all(userAuth).then(valueUser => resolve(valueUser)).catch(e => reject(e))
            }
        })
    }

    async updateEnabledById(id: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.userRepository.updateEnabledById(id, userAuth.token).then(_ => resolve()).catch(e => reject(e))
            }
        })
    }

    async deleteById(id: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.userRepository.deleteById(id, userAuth.token).then(_ => resolve()).catch(e => reject(e))
            }
        })
    }

    async deleteByIds(ids: number[]): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.userRepository.deleteByIds(ids, userAuth.token).then(_ => resolve()).catch(e => reject(e))
            }
        })
    }

    async register(name: string, cellphone: string, password: string, passwordConfirm: string, isAdmin: boolean): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.userRepository.register({ name, cellphone, password, password_confirm: passwordConfirm, is_admin: isAdmin }, userAuth.token)
                    .then(_ => resolve()).catch(e => reject(e))
            }
        })
    }
}