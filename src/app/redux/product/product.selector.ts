import { ProductEntity } from "@entity"

export const productsSelector = (state: any) => state.product.products as ProductEntity[]
export const productSelector = (state: any) => state.product.product as ProductEntity | null