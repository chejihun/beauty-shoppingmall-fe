import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiAction } from "./commonUiAction";

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

export const userAction = {
  registerUser,
};
