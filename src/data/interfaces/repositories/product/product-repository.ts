import { ProductEntity } from "@entity"

export interface ProductRepository {
    all(token: string): Promise<ProductEntity[]>
    deleteById(id: number, token: string): Promise<void>
    deleteByIds(ids: number[], token: string): Promise<void>
    upload(file: File | null, token: string): Promise<string | null>
    register(params: { description: string, gross_price: string | null, sale_price: string | null, photo: string | null }, token: string): Promise<void>
    openOneById(id: number, token: string): Promise<ProductEntity>
    updateAllById(id: number, params: { description: string, gross_price: string | null, sale_price: string | null, status_photo: -1 | 0 | 1, photo: string | null }, token: string): Promise<void>
}