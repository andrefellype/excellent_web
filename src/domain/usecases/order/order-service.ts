import { OrderRepository } from "@data/interfaces/repositories"
import { OrderEntity, UserAuthEntity } from "@entity"
import { GetLocalStorage, VALUES_APP } from "@utils"

export class OrderServiceImpl {
    private orderRepository: OrderRepository
    constructor(orderRepository: OrderRepository) { this.orderRepository = orderRepository }

    async all(): Promise<OrderEntity[]> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.orderRepository.all(userAuth.token).then(valueCategories => resolve(valueCategories)).catch(e => reject(e))
            }
        })
    }

    async deleteById(id: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.orderRepository.deleteById(id, userAuth.token).then(_ => resolve()).catch(e => reject(e))
            }
        })
    }

    async deleteByIds(ids: number[]): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.orderRepository.deleteByIds(ids, userAuth.token).then(_ => resolve()).catch(e => reject(e))
            }
        })
    }

    async register(quantity: number, productIds: number[], clientId: number | null): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const tokenLocal = GetLocalStorage(VALUES_APP().LOCAL_STORAGE.KEY_USER)
            if (tokenLocal !== null) {
                const userAuth = JSON.parse(tokenLocal) as UserAuthEntity
                await this.orderRepository.register({ quantity, product_ids: productIds, client_id: clientId }, userAuth.token).then(_ => resolve()).catch(e => reject(e))
            }
        })
    }
}