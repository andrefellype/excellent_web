import { OrderEntity } from "@entity"
import { updateOrder, updateOrders } from "./order.reducer"

export const updateOrderAction = (dispatch: any, value: OrderEntity | null) => { dispatch(updateOrder(JSON.stringify(value))) }
export const updateOrdersAction = (dispatch: any, value: OrderEntity[]) => { dispatch(updateOrders(JSON.stringify(value))) }