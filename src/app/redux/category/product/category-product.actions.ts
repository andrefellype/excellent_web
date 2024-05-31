import { CategoryProductEntity } from "@entity"
import { updateCategoriesProduct, updateCategoryProduct } from "./category-product.reducer"

export const updateCategoriesProductAction = (dispatch: any, value: CategoryProductEntity[]) => { dispatch(updateCategoriesProduct(JSON.stringify(value))) }
export const updateCategoryProductAction = (dispatch: any, value: CategoryProductEntity | null) => { dispatch(updateCategoryProduct(JSON.stringify(value))) }