import * as types from "../constants/post.constants";
const initialState = {
  loading: false,
  error: "",
  postList: [],
  totalPageNum: 1,
  selectedPost: null,
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.POST_CREATE_REQUEST:
    case types.POST_GET_REQUEST:
    case types.GET_POST_REQUEST:
      return { ...state, loading: true }

    case types.POST_CREATE_SUCCESS:
      return { ...state, loading: false, error: "" }
    case types.POST_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        postList: payload.data,
        totalPageNum: payload.totalPageNum
      }
    case types.GET_POST_SUCCESS: {
      return {...state, loading: false, selectedPost: payload };
    }

    case types.POST_CREATE_FAIL:
    case types.POST_GET_FAIL:
    case types.GET_POST_FAIL:  
      return { ...state, loading: false, error: payload }

    case types.SET_SELECTED_POST:
      return { ...state, selectedPost: payload }
    default:
      return state;
  }
}

export default postReducer;