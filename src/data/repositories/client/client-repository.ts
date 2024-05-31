import axios from 'axios'
import { ErrorException, ReturnValueHttp, VALUES_APP } from '@utils';
import { ClientRepository } from '@data/interfaces/repositories';
import { ClientEntity } from '@entity';

export class ClientRepositoryImpl implements ClientRepository {
    private URL_API = VALUES_APP().API.URL
    private URL_API_CLIENT = "client"

    register(params: { name: string; document_number: string; email: string | null; }, token: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.post(`${this.URL_API_CLIENT}/register`, { ...params, platform: 'WEB' }).then(async response => {
                if (response.status === 200) {
                    try {
                        ReturnValueHttp(response.data)
                        resolve()
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject(e.code) })
        })
    }

    all(token: string): Promise<ClientEntity[]> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.get(`${this.URL_API_CLIENT}/all`).then(async response => {
                if (response.status === 200) {
                    try {
                        const valueResponse = ReturnValueHttp(response.data)
                        resolve(valueResponse as ClientEntity[])
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject({ error: e }) })
        })
    }

    deleteById(id: number, token: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.delete(`${this.URL_API_CLIENT}/${id}`).then(async response => {
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
            await api.put(`${this.URL_API_CLIENT}/delete`, { clientIds: ids }).then(async response => {
                if (response.status === 200) {
                    try {
                        ReturnValueHttp(response.data)
                        resolve()
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject(e.code) })
        })
    }

    openOneById(id: number, token: string): Promise<ClientEntity> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.get(`${this.URL_API_CLIENT}/open/${id}`).then(async response => {
                if (response.status === 200) {
                    try {
                        const valueResponse = ReturnValueHttp(response.data)
                        resolve(valueResponse as ClientEntity)
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject({ error: e }) })
        })
    }

    updateAllById(id: number, params: { name: string; email: string; }, token: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.put(`${this.URL_API_CLIENT}/update/${id}`, { ...params, platform: 'WEB' }).then(async response => {
                if (response.status === 200) {
                    try {
                        ReturnValueHttp(response.data)
                        resolve()
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject(e.code) })
        })
    }

    openInformationByCnpj(cnpj: string, token: string): Promise<{
        name: string; email: string; foundation: string; addressCodePostal: string; addressStreet: string; addressNumber: string; addressDistrict: string;
    }> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.get(`${this.URL_API_CLIENT}/open/information/${cnpj}`).then(async response => {
                if (response.status === 200) {
                    try {
                        const valueResponse = ReturnValueHttp(response.data)
                        resolve(valueResponse as {
                            name: string; email: string; foundation: string; addressCodePostal: string; addressStreet: string; addressNumber: string; addressDistrict: string;
                        })
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject({ error: e }) })
        })
    }
}