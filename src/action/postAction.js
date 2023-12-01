import api from "../utils/api";
import * as types from "../constants/post.constants";
import { toast } from "react-toastify";
import { commonUiAction } from "./commonUiAction";

export const SET_MODE = 'SET_MODE';

export const setMode = (mode) => ({
  type: SET_MODE,
  payload: mode,
});

const createPost = ({ title, description, category }) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.POST_CREATE_REQUEST })
    const mode = getState().post.mode;
    const response = await api.post('/post', {
      title,
      description,
      category,
    });
    if (response.status !== 200) {
      throw new Error(response.error)
    }
    dispatch({ type: types.POST_CREATE_SUCCESS })
    dispatch(commonUiAction.showToastMessage("게시물 생성 완료", "success"))
    dispatch(getPostList())
    if (mode === 'new') {
      dispatch(getPostList());
    }
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
        totalPageNum: response.data.totalPageNum,
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

const editPost = (updatedData, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.POST_EDIT_REQUEST })
    const response = await api.put(`/post/${id}`, updatedData)
    if (response.status !== 200) {
      throw new Error(response.error)
    }
    dispatch({ type: types.POST_EDIT_SUCCESS, payload: response.data.data })
    dispatch(commonUiAction.showToastMessage("게시물 수정완료", "success"))
    // dispatch(getPostList())
    const mode = getState().post.mode;
    if (mode === 'new') {
      dispatch(getPostList({ page: 1, title: "" }));
    }
  } catch (error) {
    dispatch({ type: types.POST_EDIT_FAIL, payload: error.error })
    dispatch(commonUiAction.showToastMessage(error.error, "error"))
  }
}

const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.POST_DELETE_REQUEST });
    const response = await api.delete(`/post/${id}`);
    
    if (response.status !== 200) {
      throw new Error(response.data.error);
    }

    dispatch({ type: types.POST_DELETE_SUCCESS});
    dispatch(commonUiAction.showToastMessage("상품 삭제완료", "success"));
  } catch (error) {
    dispatch({ type: types.POST_DELETE_FAIL, payload: error.message });
    dispatch(commonUiAction.showToastMessage(error.message, "error"));
  }
};

export const postAction = {
  createPost,
  getPostList,
  getPostDetail,
  editPost,
  setMode,
  deletePost
}
