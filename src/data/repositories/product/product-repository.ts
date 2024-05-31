import axios from 'axios'
import { ErrorException, ReturnValueHttp, VALUES_APP } from '@utils';
import { ProductRepository } from '@data/interfaces/repositories';
import { ProductEntity } from '@entity';

export class ProductRepositoryImpl implements ProductRepository {
    private URL_API = VALUES_APP().API.URL
    private URL_API_PRODUCT = "product"

    all(token: string): Promise<ProductEntity[]> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.get(`${this.URL_API_PRODUCT}/all`).then(async response => {
                if (response.status === 200) {
                    try {
                        const valueResponse = ReturnValueHttp(response.data)
                        resolve(valueResponse as ProductEntity[])
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject({ error: e }) })
        })
    }

    deleteById(id: number, token: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.delete(`${this.URL_API_PRODUCT}/${id}`).then(async response => {
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
            await api.put(`${this.URL_API_PRODUCT}/delete`, { productIds: ids }).then(async response => {
                if (response.status === 200) {
                    try {
                        ReturnValueHttp(response.data)
                        resolve()
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject(e.code) })
        })
    }

    upload(file: File | null, token: string): Promise<string | null> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            const dataForm = new FormData()
            if (file !== null) dataForm.append('file', file)
            await api.post(`${this.URL_API_PRODUCT}/upload`, dataForm).then(async response => {
                if (response.status === 200) {
                    try {
                        const valueResponse = ReturnValueHttp(response.data)
                        resolve(valueResponse.filename as string | null)
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject(e.code) })
        })
    }

    register(params: { description: string; gross_price: string | null; sale_price: string | null; photo: string | null; }, token: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.post(`${this.URL_API_PRODUCT}/register`, params).then(async response => {
                if (response.status === 200) {
                    try {
                        ReturnValueHttp(response.data)
                        resolve()
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject(e.code) })
        })
    }

    openOneById(id: number, token: string): Promise<ProductEntity> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.get(`${this.URL_API_PRODUCT}/open/${id}`).then(async response => {
                if (response.status === 200) {
                    try {
                        const valueResponse = ReturnValueHttp(response.data)
                        resolve(valueResponse as ProductEntity)
                    } catch (e) { ErrorException(reject, e) }
                }
            }).catch((e) => { reject({ error: e }) })
        })
    }

    updateAllById(id: number, params: { description: string; gross_price: string | null; sale_price: string | null; status_photo: -1 | 0 | 1; photo: string | null; }, token: string): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const api = axios.create({ baseURL: this.URL_API, headers: { Accept: "application/json", "x-access-token": token } })
            await api.put(`${this.URL_API_PRODUCT}/update/${id}`, params).then(async response => {
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