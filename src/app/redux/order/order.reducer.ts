import { OrderEntity } from "@entity";
import { createSlice } from "@reduxjs/toolkit";

interface OrderState { order: OrderEntity | null, orders: OrderEntity[] }

const initialState: OrderState = { order: null, orders: [] }

export const orderSlice = createSlice({
    name: "order",
    initialState: initialState,
    reducers: {
        updateOrder: (state, action) => { state.order = JSON.parse(action.payload) },
        updateOrders: (state, action) => { state.orders = JSON.parse(action.payload) }
    }
})

export const { updateOrder, updateOrders } = orderSlice.actions

export default orderSlice.reducer