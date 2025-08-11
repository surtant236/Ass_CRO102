import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducers/productReducer";
import cartReducer from "../reducers/cartReducer";

const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
