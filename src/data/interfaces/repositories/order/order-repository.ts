import { OrderEntity } from "@entity"

export interface OrderRepository {
    all(token: string): Promise<OrderEntity[]>
    deleteById(id: number, token: string): Promise<void>
    deleteByIds(ids: number[], token: string): Promise<void>
    register(params: { quantity: number, product_ids: number[], client_id: number | null }, token: string): Promise<void>
}