import axios from 'axios'
import { UserEntity, UserAuthEntity } from "@entity";
import { ErrorException, ReturnValueHttp, VALUES_APP } from '@utils';
import { UserRepository } from '@data/interfaces/repositories';

export class UserRepositoryImpl implements UserRepository {
    private URL_API = VALUES_APP().API.URL
    private URL_API_USER = "user"

    openOneById(id: number, token: string): Promise<UserEntity> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.get(`${this.URL_API_USER}/open/${id}`).then(async response => {
                if (response.status === 200) {
                    try {
                        const valueResponse = ReturnValueHttp(response.data)
                        resolve(valueResponse as UserEntity)
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject({ error: e }) })
        })
    }

    all(userAuth: UserAuthEntity): Promise<UserEntity[]> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": userAuth.token } })
            await api.get(`${this.URL_API_USER}/not/${userAuth.user.id}`).then(async response => {
                if (response.status === 200) {
                    try {
                        const valueResponse = ReturnValueHttp(response.data)
                        resolve(valueResponse as UserEntity[])
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject({ error: e }) })
        })
    }

    updateEnabledById(id: number, token: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.get(`${this.URL_API_USER}/update/enabled/${id}`).then(async response => {
                if (response.status === 200) {
                    try {
                        ReturnValueHttp(response.data)
                        resolve()
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject(e.code) })
        })
    }

    deleteById(id: number, token: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.delete(`${this.URL_API_USER}/${id}`).then(async response => {
                if (response.status === 200) {
                    try {
                        ReturnValueHttp(response.data)
                        resolve()
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject(e.code) })
        })
    }

    deleteByIds(ids: number[], token: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.put(`${this.URL_API_USER}/delete`, { userIds: ids }).then(async response => {
                if (response.status === 200) {
                    try {
                        ReturnValueHttp(response.data)
                        resolve()
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject(e.code) })
        })
    }

    register(params: { name: string; cellphone: string; password: string; password_confirm: string; is_admin: boolean; }, token: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.post(`${this.URL_API_USER}/register`, { ...params, platform: 'WEB' }).then(async response => {
                if (response.status === 200) {
                    try {
                        ReturnValueHttp(response.data)
                        resolve()
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject(e.code) })
        })
    }
}