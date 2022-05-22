import * as actionTypes from "./actionTypes";
import axios from "axios";
import { message } from "antd";
import throttle from "lodash/throttle";

export const RetrieveTasks = () => {
  return async (dispatch, getState) => {
    let url = `${actionTypes.BASE_URL}/api/v1/task`;
    let token = getState()?.authReducer?.userDetails?.accessToken;
    try {
      let res = await axios.get(url, {
        headers: { "x-access-token": token },
      });
      console.log(res.data, "Task-fetch");
      dispatch({
        type: actionTypes.FETCH_TASKS,
        payload: res.data,
      });
      return res.status;
    } catch (error) {
      message.warning("Error in retrieving task list!");
      return error;
    }
  };
};

export const createTasks = (payload) => {
  return async (dispatch, getState) => {
    let url = `${actionTypes.BASE_URL}/api/v1/task`;
    try {
      let res = await axios.post(url, payload);
      console.log(res.data, "Task-Create");
      return res.status;
    } catch (error) {
      message.warning("Error in creating task!");
      return error;
    }
  };
};

export const deleteTasks = (id) => {
  return async (dispatch, getState) => {
    let url = `${actionTypes.BASE_URL}/api/v1/task/${id}`;
    try {
      let res = await axios.delete(url);
      return res.status;
    } catch (error) {
      message.warning("Error in deleting task!");
      return error;
    }
  };
};

export const updateTasks = (payload) => {
  return async (dispatch, getState) => {
    let token = getState()?.authReducer?.userDetails?.accessToken;
    let url = `${actionTypes.BASE_URL}/api/v1/task`;
    try {
      let res = await axios.put(url, payload, {
        headers: { "x-access-token": token },
      });
      return res.status;
    } catch (error) {
      message.warning("Error in creating task!");
      return error;
    }
  };
};

const debouncedSearchUser = throttle(
  async (payload) => {
    let url = `${actionTypes.BASE_URL}/api/v1/getUsers?name=${payload}`;
    let response = await axios({ method: "get", url: url });
    return response;
  },
  800,
  { leading: true }
);

export const getUser = (payload) => {
  return async (dispatch) => {
    try {
      let response = await debouncedSearchUser(payload);
      if (response && response.data) {
        dispatch({
          type: actionTypes.FIND_USERS,
          payload: response.data,
        });
      }
      return response?.data;
    } catch (error) {
      console.log(error, "error");
    }
  };
};

export const resetUsersList = () => {
  return {
    type: actionTypes.EMPTY_USER_LIST,
  };
};

const debouncedSearchTask = throttle(
  async (payload) => {
    let url = `${actionTypes.BASE_URL}/api/v1/getTask?title=${payload}`;
    let response = await axios({ method: "get", url: url });
    return response;
  },
  800,
  { leading: true }
);

export const searchTask = (payload) => {
  return async (dispatch, getState) => {
    try {
      let response = await debouncedSearchTask(payload);
      if (response && response.data) {
        dispatch({
          type: actionTypes.FIND_TASKS,
          payload: response.data,
        });
      }
      return response?.data;
    } catch (error) {
      console.log(error, "error");
    }
  };
};

export const fetchAllTasks = () => {
  return async (dispatch) => {
    try {
      let url = `${actionTypes.BASE_URL}/api/v1/task/fetchAll`;
      let response = await axios.get(url);
      console.log(response.data, "fetch-all-tasks");
      dispatch({
        type: actionTypes.FETCH_TASKS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
