import { ProductEntity } from "@entity"
import { updateProduct, updateProducts } from "./product.reducer"

export const updateProductsAction = (dispatch: any, value: ProductEntity[]) => { dispatch(updateProducts(JSON.stringify(value))) }
export const updateProductAction = (dispatch: any, value: ProductEntity | null) => { dispatch(updateProduct(JSON.stringify(value))) }