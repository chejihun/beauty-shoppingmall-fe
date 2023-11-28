import api from "../utils/api";
import * as types from "../constants/post.constants";
import { toast } from "react-toastify";
import { commonUiAction } from "./commonUiAction";

const createPost = ({ title, description, category, name }) => async (dispatch) => {
  try {
    dispatch({ type: types.POST_CREATE_REQUEST })
    const response = await api.post('/post', {
      title,
      description,
      category,
      name
    });
    if (response.status !== 200) {
      throw new Error(response.error)
    }
    dispatch(commonUiAction.showToastMessage("게시물 생성 완료", "success"))
    dispatch({ type: types.POST_CREATE_SUCCESS })
    dispatch(getPostList())
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
    dispatch({ type: types.POST_GET_SUCCESS, payload: response.data })
  } catch (error) {
    dispatch({ type: types.POST_GET_FAIL, payload: error.error })
    dispatch(commonUiAction.showToastMessage(error.error, "error"))
  }
};

const getPostDetail = (id) => async (dispatch) => {
  try {
    dispatch({type:types.GET_POST_REQUEST});
    const response = await api.get(`/post/${id}`);
    if(response.status !== 200) throw new Error(response.error);
    
    dispatch({
      type: types.GET_POST_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    dispatch({ type: types.GET_POST_FAIL, payload: error.error });
    dispatch(commonUiAction.showToastMessage(error.error, "error"));
  }
}

export const postAction = {
  createPost,
  getPostList,
  getPostDetail
}
