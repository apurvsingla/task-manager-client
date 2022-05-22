import * as actionTypes from "../actions/actionTypes";

const initialState = {
  tasks: [],
  users: [],
  searchTask: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TASKS:
      return {
        ...state,
        tasks: [...action.payload],
      };
    case actionTypes.FIND_USERS:
      return {
        ...state,
        users: [...action.payload],
      };
    case actionTypes.EMPTY_USER_LIST:
      return {
        ...state,
        users: [],
      };
    case actionTypes.FIND_TASKS:
      return {
        ...state,
        searchTask: [...action.payload],
      };
    case actionTypes.LOG_OUT_ACTION:
      return {
        ...state,
        tasks: [],
        users: [],
        searchTask: [],
      };
    default:
      return { ...state };
  }
};

export default reducer;
