import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const product = action.payload;
            const existingItem = state.cartItems.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({
                    ...product,
                    quantity: 1
                });
            }
            
            // Recalculate totals
            state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.cartItems.reduce((total, item) => 
                total + (parseFloat(item.price.replace(/[^\d]/g, '')) * item.quantity), 0
            );
        },
        removeFromCart(state, action) {
            const productId = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== productId);
            
            // Recalculate totals
            state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.cartItems.reduce((total, item) => 
                total + (parseFloat(item.price.replace(/[^\d]/g, '')) * item.quantity), 0
            );
        },
        updateQuantity(state, action) {
            const { productId, quantity } = action.payload;
            const existingItem = state.cartItems.find(item => item.id === productId);
            
            if (existingItem) {
                if (quantity <= 0) {
                    state.cartItems = state.cartItems.filter(item => item.id !== productId);
                } else {
                    existingItem.quantity = quantity;
                }
            }
            
            // Recalculate totals
            state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.totalAmount = state.cartItems.reduce((total, item) => 
                total + (parseFloat(item.price.replace(/[^\d]/g, '')) * item.quantity), 0
            );
        },
        clearCart(state) {
            state.cartItems = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
