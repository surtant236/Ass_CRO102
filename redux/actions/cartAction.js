import axios from "axios";
import { addToCart as addToCartReducer, removeFromCart as removeFromCartReducer, updateQuantity as updateQuantityReducer, clearCart as clearCartReducer, loadCartFromDb } from "../reducers/cartReducer";

const cartApiUrl = "http://192.168.1.23:3000/carts";

const saveCartToDb = async (cartItems) => {
    try {
        console.log("Đang lưu giỏ hàng vào db.json...", cartItems);
        
        const response = await axios.get(cartApiUrl);
        console.log("Giỏ hàng hiện tại trong db:", response.data);
        
        if (response.data.length > 0) {
            await Promise.all(
                response.data.map(item => axios.delete(`${cartApiUrl}/${item.id}`))
            );
            console.log("Đã xóa giỏ hàng cũ");
        }
        
        if (cartItems.length > 0) {
            const cartItemsWithId = cartItems.map((item, index) => ({
                ...item,
                cartId: `cart_${item.id}_${Date.now()}_${index}`
            }));
            
            await Promise.all(
                cartItemsWithId.map(item => axios.post(cartApiUrl, item))
            );
            console.log("Đã thêm giỏ hàng mới vào db");
        }
        
        console.log("Hoàn thành lưu giỏ hàng!");
    } catch (error) {
        console.log("Lỗi khi lưu giỏ hàng:", error.message);
    }
};


export const addToCart = (product) => async (dispatch, getState) => {
    dispatch(addToCartReducer(product));
    const { cart } = getState();
    await saveCartToDb(cart.cartItems);
};

export const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch(removeFromCartReducer(productId));
    const { cart } = getState();
    await saveCartToDb(cart.cartItems);
};

export const updateQuantity = (payload) => async (dispatch, getState) => {
    dispatch(updateQuantityReducer(payload));
    const { cart } = getState();
    await saveCartToDb(cart.cartItems);
};

export const clearCart = () => async (dispatch, getState) => {
    dispatch(clearCartReducer());
    const { cart } = getState();
    await saveCartToDb(cart.cartItems);
};

export const loadCartFromDbAction = () => async (dispatch) => {
    try {
        const response = await axios.get(cartApiUrl);
        const cartItems = response.data || [];
        dispatch(loadCartFromDb(cartItems));
        console.log("Đã load giỏ hàng từ db:", cartItems);
    } catch (error) {
        console.log("Lỗi khi lấy giỏ hàng:", error);
        dispatch(loadCartFromDb([]));
    }
};
