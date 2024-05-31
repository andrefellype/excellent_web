import { UserAuthRepository } from "@data/interfaces/repositories";
import { UserAuthEntity } from "@entity";
import { DeleteLocalStorage, GetLocalStorage, SaveLocalStorage, VALUES_APP } from "@utils";

export class UserAuthServiceImpl {
    private userAuthRepository: UserAuthRepository
    constructor(userAuthRepository: UserAuthRepository) {
        this.userAuthRepository = userAuthRepository
    }

    async signIn(cellphone: string, password: string): Promise<UserAuthEntity> {
        return new Promise(async (resolve, reject) => {
            await this.userAuthRepository.signIn({ cellphone, password }).then(valueUser => {
                SaveLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER, JSON.stringify(valueUser))
                resolve(valueUser)
            }).catch(e => reject(e))
        })
    }

    async signUp(name: string, cellphone: string, password: string, passwordConfirm: string): Promise<UserAuthEntity> {
        return new Promise(async (resolve, reject) => {
            await this.userAuthRepository.signUp({ name, cellphone, password, password_confirm: passwordConfirm }).then(valueUser => {
                SaveLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER, JSON.stringify(valueUser))
                resolve(valueUser)
            }).catch(e => reject(e))
        })
    }

    async refreshToken(): Promise<UserAuthEntity | null> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.userAuthRepository.refreshToken(userAuth.token).then(valueUser => {
                    if (valueUser) SaveLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER, JSON.stringify(valueUser))
                    else DeleteLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
                    resolve(valueUser)
                }).catch(e => {
                    if (typeof e.error !== "undefined" && e.error === "token_invalid") DeleteLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
                    reject(e)
                })
            }
        })
    }

    async signOut(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.userAuthRepository.signOut(userAuth.token).then(_ => resolve()).catch(e => reject(e))
            }
        })
    }

    async updateAllById(id: number, name: string, cellphone: string): Promise<UserAuthEntity | null> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.userAuthRepository.updateAllById(id, { name, cellphone }, userAuth.token).then(valueUser => {
                    if (valueUser !== null) SaveLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER, JSON.stringify(valueUser))
                    else DeleteLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
                    resolve(valueUser)
                }).catch(e => reject(e))
            }
        })
    }

    async updatePasswordById(id: number, password: string, passwordConfirm: string): Promise<UserAuthEntity | null> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.userAuthRepository.updatePasswordById(id, { password, password_confirm: passwordConfirm }, userAuth.token).then(valueUser => {
                    if (typeof valueUser !== "boolean") SaveLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER, JSON.stringify(valueUser))
                    else DeleteLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
                    resolve(valueUser)
                }).catch(e => reject(e))
            }
        })
    }
}