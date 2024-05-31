import { CategoryProductEntity } from "@entity";
import { createSlice } from "@reduxjs/toolkit";

interface CategoryProductState { categories: CategoryProductEntity[], category: CategoryProductEntity | null }

const initialState: CategoryProductState = { categories: [], category: null };

export const categoryProductSlice = createSlice({
    name: "categoryProduct",
    initialState: initialState,
    reducers: {
        updateCategoriesProduct: (state, action) => { state.categories = JSON.parse(action.payload); },
        updateCategoryProduct: (state, action) => { state.category = JSON.parse(action.payload); }
    }
});

export const { updateCategoriesProduct, updateCategoryProduct } = categoryProductSlice.actions;

export default categoryProductSlice.reducer;