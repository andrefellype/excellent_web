import { CategoryProductEntity } from "@entity"

export interface CategoryProductRepository {
    all(token: string): Promise<CategoryProductEntity[]>
    deleteById(id: number, token: string): Promise<void>
    deleteByIds(ids: number[], token: string): Promise<void>
    upload(file: File | null, token: string): Promise<string | null>
    register(params: { name: string, icon: string | null }, token: string): Promise<void>
    openOneById(id: number, token: string): Promise<CategoryProductEntity>
    updateAllById(id: number, params: { name: string, status_icon: -1 | 0 | 1, icon: string | null }, token: string): Promise<void>
}