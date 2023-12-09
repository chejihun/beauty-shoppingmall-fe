import * as types from "../constants/post.constants";
const initialState = {
  loading: false,
  error: "",
  postList: [],
  totalPostNum: 1,
  selectedPost: null,
  mode: 'new',
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {

    case types.SET_MODE:
      return { ...state, mode: payload };
      
    case types.POST_CREATE_REQUEST:
    case types.POST_GET_REQUEST:
    case types.GET_POST_REQUEST:
    case types.POST_EDIT_REQUEST:
    case types.POST_DELETE_REQUEST:
      return { ...state, loading: true }

    case types.POST_CREATE_SUCCESS:
    case types.POST_EDIT_SUCCESS:
    case types.POST_DELETE_SUCCESS:
      return { ...state, loading: false, error: "" }
    case types.POST_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        postList: payload.postList,
        totalPostNum: payload.totalPostNum,
        page: payload.page,
      }
    case types.GET_POST_SUCCESS: {
      return {...state, loading: false, selectedPost: payload };
    }

    case types.POST_CREATE_FAIL:
    case types.POST_GET_FAIL:
    case types.GET_POST_FAIL:
    case types.POST_EDIT_FAIL:
    case types.POST_DELETE_FAIL:
      return { ...state, loading: false, error: payload };

    case types.SET_SELECTED_POST:
      return { ...state, selectedPost: payload }
    case types.CLEAR:
      return initialState
    default:
      return state;
  }
}

export default postReducer;