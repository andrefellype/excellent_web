import { OrderEntity } from "@entity"

export const orderSelector = (state: any) => state.order.order as OrderEntity | null
export const ordersSelector = (state: any) => state.order.orders as OrderEntity[]