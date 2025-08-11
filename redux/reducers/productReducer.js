import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listProducts: [],
    loading: false,
    error: null
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.listProducts = action.payload;
            state.loading = false;
            state.error = null;
        },
        addProduct(state, action) {
            state.listProducts.push(action.payload);
        },
        editProduct(state, action) {
            const { id, product } = action.payload;
            const index = state.listProducts.findIndex(p => p.id === id);
            if (index !== -1) {
                state.listProducts[index] = { ...state.listProducts[index], ...product };
            }
        },
        deleteProduct(state, action) {
            state.listProducts = state.listProducts.filter(p => p.id !== action.payload);
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { setProducts, addProduct, editProduct, deleteProduct, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;
