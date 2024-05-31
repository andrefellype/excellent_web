import { CategoryProductEntity } from "@entity"

export const categoriesProductSelector = (state: any) => state.categoryProduct.categories as CategoryProductEntity[]
export const categoryProductSelector = (state: any) => state.categoryProduct.category as CategoryProductEntity | null