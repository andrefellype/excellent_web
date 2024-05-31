import axios from 'axios'
import { UserAuthEntity } from "@entity";
import { ErrorException, ReturnValueHttp, VALUES_APP } from '@utils';
import { UserAuthRepository } from '@data/interfaces/repositories';

export class UserAuthRepositoryImpl implements UserAuthRepository {
    private URL_API = VALUES_APP().API.URL
    private URL_API_USER = "user"

    signIn(params: { cellphone: string, password: string }): Promise<UserAuthEntity> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json" } })
            await api.post(`${this.URL_API_USER}/signin`, params).then(async response => {
                if (response.status === 200) {
                    try {
                        const valueResponse = ReturnValueHttp(response.data)
                        resolve(valueResponse as UserAuthEntity)
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject({ error: e }) })
        })
    }

    signUp(params: { name: string, cellphone: string, password: string, password_confirm: string }): Promise<UserAuthEntity> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json" } })
            await api.post(`${this.URL_API_USER}/signup`, params).then(async response => {
                if (response.status === 200) {
                    try {
                        const valueResponse = ReturnValueHttp(response.data)
                        resolve(valueResponse as UserAuthEntity)
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject(e.code) })
        })
    }

    refreshToken(token: string): Promise<UserAuthEntity | null> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.get(`${this.URL_API_USER}/refresh/token`).then(async response => {
                if (response.status === 200) {
                    try {
                        const valueResponse = ReturnValueHttp(response.data)
                        resolve(valueResponse as UserAuthEntity | null)
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject(e.code) })
        })
    }

    signOut(token: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.get(`${this.URL_API_USER}/signout`).then(async response => {
                try {
                    ReturnValueHttp(response.data)
                    resolve()
                } catch (e) { ErrorException(reject, e) }
            }).catch((e) => { reject(e.code) })
        })
    }

    updateAllById(id: number, params: { name: string; cellphone: string; }, token: string): Promise<UserAuthEntity | null> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.put(`${this.URL_API_USER}/update/auth/${id}`, { ...params, platform: 'WEB' }).then(async response => {
                if (response.status === 200) {
                    try {
                        const valueResponse = ReturnValueHttp(response.data)
                        resolve(valueResponse as UserAuthEntity | null)
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject(e.code) })
        })
    }

    updatePasswordById(id: number, params: { password: string; password_confirm: string; }, token: string): Promise<UserAuthEntity | null> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.put(`${this.URL_API_USER}/update/auth/password/${id}`, { ...params, platform: 'WEB' }).then(async response => {
                if (response.status === 200) {
                    try {
                        const valueResponse = ReturnValueHttp(response.data)
                        resolve(valueResponse as UserAuthEntity | null)
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject(e.code) })
        })
    }
}