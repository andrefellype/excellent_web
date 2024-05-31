import { configureStore } from "@reduxjs/toolkit"
import configurationLoadingReducer from "./configuration/loading/loading.reducer"
import configurationMessageReducer from "./configuration/message/message.reducer"
import userAuthReducer from "./user/auth/auth.reducer"
import userReducer from "./user/user.reducer"
import clientReducer from "./client/client.reducer"
import categoryProductReducer from "./category/product/category-product.reducer"
import productReducer from "./product/product.reducer"
import orderReducer from "./order/order.reducer"

export const reducerConfiguration = {
    configurationLoading: configurationLoadingReducer,
    configurationMessage: configurationMessageReducer
}

export const reducerUser = { userAuth: userAuthReducer, user: userReducer }

export const reducerClient = { client: clientReducer }

export const reducerCategory = { categoryProduct: categoryProductReducer }

export const reducerProduct = { product: productReducer }

export const reducerOrder = { order: orderReducer }

export default configureStore({ reducer: { ...reducerConfiguration, ...reducerUser, ...reducerClient, ...reducerCategory, ...reducerProduct, ...reducerOrder } });