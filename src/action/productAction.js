import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiAction } from "./commonUiAction";

const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_CREATE_REQUEST })
    const response = await api.post("/product", formData)
    if(response.status !== 200) {
      throw new Error(response.error)
    }
    dispatch(commonUiAction.showToastMessage("상품생성 완료", "success"))
    dispatch({type:types.PRODUCT_CREATE_SUCCESS})
  } catch (error) {
    dispatch({type:types.PRODUCT_CREATE_FAIL, payload:error.error})
    dispatch(commonUiAction.showToastMessage(error.error, "error"))
  }
};

export const productAction = {
  createProduct,
};