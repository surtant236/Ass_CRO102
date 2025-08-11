import axios from "axios";
import { addProduct, setProducts, editProduct, deleteProduct, setLoading, setError } from "../reducers/productReducer";

const apiUrl = "http://192.168.25.2:3000/products"; // Thay đổi URL theo server của bạn

export const getListProducts = () => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(apiUrl);
        dispatch(setProducts(response.data));
    } catch (error) {
        console.log("Lỗi khi lấy danh sách sản phẩm:", error);
        dispatch(setError(error.message));
    }
};

export const addProductAction = (product) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.post(apiUrl, product);
        dispatch(addProduct(response.data));
    } catch (error) {
        console.log("Lỗi khi thêm sản phẩm:", error);
        dispatch(setError(error.message));
    }
};

export const editProductAction = (id, product) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await axios.put(`${apiUrl}/${id}`, product);
        dispatch(editProduct({ id, product: response.data }));
    } catch (error) {
        console.log("Lỗi khi sửa sản phẩm:", error);
        dispatch(setError(error.message));
    }
};

export const deleteProductAction = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        await axios.delete(`${apiUrl}/${id}`);
        dispatch(deleteProduct(id));
    } catch (error) {
        console.log("Lỗi khi xóa sản phẩm:", error);
        dispatch(setError(error.message));
    }
};
