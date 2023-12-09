import api from "../utils/api";
import * as types from "../constants/post.constants";
import { commonUiAction } from "./commonUiAction";

export const setMode = (mode) => ({
  type: types.SET_MODE,
  payload: mode,
});

export const clearPost = () => ({
  type: types.CLEAR,
})

const createPost = ({ title, description, category, image, navigate, navigateTo }) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.POST_CREATE_REQUEST })
    const mode = getState().post.mode;
    const response = await api.post('/post', {
      title,
      description,
      category,
      image
    });
    if (response.status !== 200) {
      throw new Error(response.error)
    }
    dispatch({ type: types.POST_CREATE_SUCCESS })
    dispatch(commonUiAction.showToastMessage("게시물 생성 완료", "success"))

    navigate(navigateTo)
  } catch (error) {
    dispatch({ type: types.POST_CREATE_FAIL, payload: error.error })
    dispatch(commonUiAction.showToastMessage(error.error, "error"))
  }
}

const getPostList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.POST_GET_REQUEST })
    const response = await api.get("/post", {
      params: query
    })
    if (response.status !== 200) {
      throw new Error(response.error)
    }
    dispatch({
      type: types.POST_GET_SUCCESS,
      payload: {
        postList: response.data.data,
        totalPostNum: response.data.totalPostNum,
        page: response.data.page,
      }
    })
    // dispatch(getPostList()) 리퀘스트 반복시킴;
  } catch (error) {
    dispatch({ type: types.POST_GET_FAIL, payload: error.error })
    dispatch(commonUiAction.showToastMessage(error.error, "error"))
  }
};

const getPostDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_POST_REQUEST });
    const response = await api.get(`/post/${id}`);
    if (response.status !== 200) throw new Error(response.error);

    dispatch({
      type: types.GET_POST_SUCCESS,
      payload: response.data.data
    });
    dispatch(getPostList())
  } catch (error) {
    dispatch({ type: types.GET_POST_FAIL, payload: error.error });
    dispatch(commonUiAction.showToastMessage(error.error, "error"));
  }
}
const editPost = ({ title, description, category, image, navigate, navigateTo, postId}) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.POST_EDIT_REQUEST })
    const response = await api.put(`/post/${postId}`, {
      title,
      description,
      category,
      image
    })
    if (response.status !== 200) {
      throw new Error(response.error)
    }
    dispatch({ type: types.POST_EDIT_SUCCESS, payload: response.data.data })
    dispatch(commonUiAction.showToastMessage("게시물 수정완료", "success"))
    navigate(navigateTo)
    const mode = getState().post.mode;
    if (mode === 'new') {
      dispatch(getPostList({ page: 1, title: "" }));
    }
  } catch (error) {
    dispatch({ type: types.POST_EDIT_FAIL, payload: error.error })
    dispatch(commonUiAction.showToastMessage(error.error, "error"))
  }
}

const deletePost = ({postId, navigate, navigateTo}) => async (dispatch) => {
  try {
    dispatch({ type: types.POST_DELETE_REQUEST });
    const response = await api.delete(`/post/${postId}`);
    
    if (response.status !== 200) {
      throw new Error(response.data.error);
    }

    dispatch({ type: types.POST_DELETE_SUCCESS});
    dispatch(commonUiAction.showToastMessage("상품 삭제완료", "success"));
    navigate(navigateTo)
  } catch (error) {
    dispatch({ type: types.POST_DELETE_FAIL, payload: error.message });
    dispatch(commonUiAction.showToastMessage(error.message, "error"));
  }
};

export const postAction = {
  setMode,
  createPost,
  getPostList,
  getPostDetail,
  editPost,
  deletePost,
  clearPost
}
