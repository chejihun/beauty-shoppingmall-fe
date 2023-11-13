import * as types from "../constants/product.constants";
const initialState = {
  loading: false,
  error: "",
<<<<<<< HEAD
  productList: [],
  selectedProduct: null,
=======
  productList:[]
  // selectedProduct: null,
>>>>>>> bb20e1efd59628653ca77e05471b601abfdf39d2
};

function productReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.PRODUCT_CREATE_REQUEST:
    case types.PRODUCT_GET_REQUEST:
<<<<<<< HEAD
      case types.PRODUCT_EDIT_REQUEST:
      return { ...state, loading: true }

    case types.PRODUCT_CREATE_SUCCESS:
    case types.PRODUCT_EDIT_SUCCESS:
      return { ...state, loading: false, error: "" }
    case types.PRODUCT_GET_SUCCESS:
      return { ...state, loading: false, error: "", productList: payload }

    case types.PRODUCT_CREATE_FAIL:
    case types.PRODUCT_GET_FAIL:
    case types.PRODUCT_EDIT_FAIL:
      return { ...state, loading: false, error: payload }

    case types.SET_SELECTED_PRODUCT:
      return { ...state, selectedProduct: payload }
=======
      return { ...state, loading: true }
    case types.PRODUCT_CREATE_SUCCESS:
      return { ...state, loading: false, error:""}
    case types.PRODUCT_GET_SUCCESS:
      return {...state, loading:false, error:"", productList:payload}
      case types.PRODUCT_CREATE_FAIL:
    case types.PRODUCT_GET_FAIL:
      return { ...state, loading: false, error: payload }
>>>>>>> bb20e1efd59628653ca77e05471b601abfdf39d2
    default:
      return state
  }
}

export default productReducer;