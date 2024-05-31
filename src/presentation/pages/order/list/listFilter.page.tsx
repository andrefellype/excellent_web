import { OrderEntity } from "@entity"
import { RemoveSpecialCaracterString } from "@utils"

export const OrderListFilterInSearch = (search: string, orders: OrderEntity[]) => {
    const searchNormalize = RemoveSpecialCaracterString(search).toLowerCase()
    return orders.filter(order => {
        const nameProductNormalize = order.product ? RemoveSpecialCaracterString(order.product.description).toLowerCase() : ""
        const nameProduct = order.product ? order.product.description.toLowerCase() : ""
        const nameClientNormalize = order.client ? RemoveSpecialCaracterString(order.client.name).toLowerCase() : ""
        const nameClient = order.client ? order.client.name.toLowerCase() : ""
        return nameProduct.toLowerCase().indexOf(search.toLowerCase()) > -1 || nameClient.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
            nameProduct.toLowerCase().indexOf(searchNormalize) > -1 || nameClient.toLowerCase().indexOf(searchNormalize) > -1 ||
            nameProductNormalize.indexOf(search.toLowerCase()) > -1 || nameClientNormalize.indexOf(search.toLowerCase()) > -1 ||
            nameProductNormalize.indexOf(searchNormalize) > -1 || nameClientNormalize.indexOf(searchNormalize) > -1
    })
}

export const OrderListFilterInOrder = (orders: OrderEntity[]) =>
    orders.sort((orderA, orderB) => {
        if (orderA.id > orderB.id) return -1
        if (orderA.id < orderB.id) return 1
        return 0
    })