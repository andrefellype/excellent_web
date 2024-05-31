import { ProductEntity } from "@entity";
import { createSlice } from "@reduxjs/toolkit";

interface ProductState { products: ProductEntity[], product: ProductEntity | null }

const initialState: ProductState = { products: [], product: null };

export const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        updateProducts: (state, action) => { state.products = JSON.parse(action.payload); },
        updateProduct: (state, action) => { state.product = JSON.parse(action.payload); }
    }
});

export const { updateProducts, updateProduct } = productSlice.actions;

export default productSlice.reducer;