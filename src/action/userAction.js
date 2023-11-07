import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiAction } from "./commonUiAction";

const loginWithToken = () => async (dispatch) => {};

//회원가입
const registerUser =
  ({ email, name, password }, navigate) =>
    async (dispatch) => {
      try {
        dispatch({ type: types.REGISTER_USER_REQUEST })
        const response = await api.post("/user", { email, name, password });
        if (response.status !== 200) {
          throw new Error(response.error)
        }
        dispatch({ type: types.REGISTER_USER_SUCCESS });
        dispatch(commonUiAction.showToastMessage("회원 가입을 완료했습니다", "success"));
        navigate("/login");
      } catch (error) {
        dispatch({ type: types.REGISTER_USER_FAIL, payload: error.error });
      }
    };

//로그인
const loginWithEmail = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({ type: types.LOGIN_REQUEST })
    const response = await api.post("/auth/login", { email, password })
    if (response.status !== 200) {
      throw new Error(response.error)
    }
    dispatch({ type: types.LOGIN_SUCCESS, payload: response.data })
    sessionStorage.setItem("token", response.data.token)
  } catch (error) {
    dispatch({ type: types.LOGIN_FAIL, payload: error.error });
  }
}

export const userAction = {
  loginWithToken,
  registerUser,
  loginWithEmail,
};
