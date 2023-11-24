import * as types from "../constants/post.constants";
const initialState = {
  loading: false,
  error: "",
  postList: [],
  totalPageNum: 1
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.POST_CREATE_REQUEST:
    case types.POST_GET_REQUEST:
      return { ...state, loading: true }

    case types.POST_CREATE_SUCCESS:
      return { ...state, loading: false, error: "" }
    case types.POST_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        postList: payload.data
      }

    case types.POST_CREATE_FAIL:
    case types.POST_GET_FAIL:
      return { ...state, loading: false, error: payload }

    default:
      return state;
  }
}

export default postReducer;