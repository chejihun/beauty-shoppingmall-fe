import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartAction } from "./cartAction";
import { commonUiAction } from "./commonUiAction";

const createOrder = (payload, navigate) => async (dispatch) => {
  try{
    dispatch({type:types.CREATE_ORDER_REQUEST})
    const response = await api.post("/order" , payload)
    if(response.status !== 200) throw new Error( response.error)

    console.log("Order Num in action1:", response.data.orderNum); 

    dispatch({type:types.CREATE_ORDER_SUCCESS, payload:response.data.orderNum})
    
    console.log("Order Num in action2:",  payload); 

    dispatch(cartAction.getCartQty())
    navigate("/payment/success")
  } catch(error){
    dispatch({type:types.CREATE_ORDER_FAIL , payload:error.error})
    dispatch(commonUiAction.showToastMessage(error.error , "error"))
  }
};

export const orderAction = {
  createOrder,
};
