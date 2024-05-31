import axios from 'axios'
import { ErrorException, ReturnValueHttp, VALUES_APP } from '@utils';
import { OrderRepository } from '@data/interfaces/repositories';
import { OrderEntity } from '@entity';

export class OrderRepositoryImpl implements OrderRepository {
    private URL_API = VALUES_APP().API.URL
    private URL_API_ORDER = "order"

    all(token: string): Promise<OrderEntity[]> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.get(`${this.URL_API_ORDER}/all`).then(async response => {
                if (response.status === 200) {
                    try {
                        const valueResponse = ReturnValueHttp(response.data)
                        resolve(valueResponse as OrderEntity[])
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject({ error: e }) })
        })
    }

    deleteById(id: number, token: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.delete(`${this.URL_API_ORDER}/${id}`).then(async response => {
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
            await api.put(`${this.URL_API_ORDER}/delete`, { orderIds: ids }).then(async response => {
                if (response.status === 200) {
                    try {
                        ReturnValueHttp(response.data)
                        resolve()
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject(e.code) })
        })
    }

    register(params: { quantity: number; product_ids: number[]; client_id: number | null; }, token: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.post(`${this.URL_API_ORDER}/register`, params).then(async response => {
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