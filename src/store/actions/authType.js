import * as actionTypes from "./actionTypes";
// import isEmpty from "lodash/isEmpty";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { message } from "antd";

export const registerUser = (payload) => {
  return async (dispatch) => {
    let url = `${actionTypes.BASE_URL}/api/v1/auth/signup`;
    try {
      let res = await axios.post(url, payload);
      return res.status;
    } catch (error) {
      message.error("Error")
      return error;
    }
  };
};

export const loginUser = (payload) => {
  return async (dispatch) => {
    let url = `${actionTypes.BASE_URL}/api/v1/auth/login`;
    try {
      let response = await axios.post(url, payload);
      if (response.status === 200) {
        let token = jwt_decode(response.data.accessToken);
        let timer = token.exp * 1000;
        expireToken(dispatch, timer);
        localStorage.setItem("token", JSON.stringify(response?.data));
        dispatch({
          type: actionTypes.LOGIN_ACTION,
          payload: response?.data,
        });
      }
      return response?.status;
    } catch (error) {
      message.error("Error")
      return error;
    }
  };
};

const expireToken = (dispatch, timer) => {
  setTimeout(() => {
    dispatch({
      type: actionTypes.LOG_OUT,
    });
  }, timer);
};

export const saveUserDetails = (payload) => {
  return async (dispatch, getState) => {
    let userDetails = getState()?.authReducer?.userDetails;
    if (!userDetails?.accessToken || !userDetails) {
      dispatch({
        type: actionTypes.USER_DETAILS,
        payload,
      });
    }
  };
};

export const logoutAction = () => {
    return {
      type: actionTypes.LOG_OUT_ACTION
    }
}
