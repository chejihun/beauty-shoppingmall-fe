import api from "../utils/api";
import * as types from "../constants/cart.constants";
import { commonUiAction } from "../action/commonUiAction";

const addToCart = ({ id, size }) => async (dispatch) => {
  try {
    dispatch({ type: types.ADD_TO_CART_REQUEST })
    const response = await api.post("/cart", { productId: id, size, qty: 1 })
    if (response.status !== 200) {
      throw new Error(response.error)
    }
    dispatch({ type: types.ADD_TO_CART_SUCCESS, payload: response.data.cartItemQty })
    dispatch(commonUiAction.showToastMessage("장바구니에 추가 하였습니다", "success"))
    dispatch(getCartQty());
  } catch (error) {
    dispatch({ type: types.ADD_TO_CART_FAIL, payload: error.error })
    dispatch(commonUiAction.showToastMessage(error.error, "error"))
  }
};

const getCartList = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_LIST_REQUEST })
    const response = await api.get("/cart")
    if (response.status !== 200) {
      throw new Error(response.error)
    }
    dispatch({ type: types.GET_CART_LIST_SUCCESS, payload: response.data.data })
  } catch (error) {
    dispatch({ type: types.GET_CART_LIST_FAIL, payload: error.error })
  }
};

const deleteCart = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CART_REQUEST })
    const response = await api.delete(`/cart/${id}`);
    if (response.status !== 200) { throw new Error(response.error) }
    dispatch({ type: types.DELETE_CART_SUCCESS, payload: response.data.cartItemQty })
    dispatch(commonUiAction.showToastMessage("상품이 삭제되었습니다", "success"))
    dispatch(getCartList());
    dispatch(getCartQty());
  } catch (error) {
    dispatch({ type: types.DELETE_CART_FAIL, payload: error.error })
    dispatch(commonUiAction.showToastMessage(error, "error"));
    
  }
};

const updateQty = (id, value) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_CART_ITEM_REQUEST })
    const response = await api.put(`/cart/${id}`, { qty: value })
    if (response.status !== 200) { throw new Error(response.error) }
    dispatch({ type: types.UPDATE_CART_ITEM_SUCCESS, payload: response.data.data })
  } catch (error) {
    dispatch({ type: types.UPDATE_CART_ITEM_FAIL, payload: error })
    dispatch(commonUiAction.showToastMessage(error, "error"));
  }
};

const getCartQty = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_QTY_REQUEST })
    const response = await api.get("/cart/qty")
    if (response.status !== 200) { throw new Error(response.error) }
    dispatch({ type: types.GET_CART_QTY_SUCCESS, payload: response.data.qty });
  } catch (error) {
    dispatch({type:types.GET_CART_QTY_FAIL, payload:error})
    dispatch(commonUiAction.showToastMessage(error, "error"));
  }
};

export const cartAction = {
  addToCart,
  getCartList,
  deleteCart,
  updateQty,
  getCartQty,
};