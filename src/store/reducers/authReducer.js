import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userDetails: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_ACTION:
      return {
        ...state,
        userDetails: { ...action.payload },
      };
    case actionTypes.LOG_OUT:
      return { ...state, userDetails: {} };
    case actionTypes.USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case actionTypes.LOG_OUT_ACTION:
      return {
        ...state,
        userDetails: {},
      };

    default:
      return { ...state };
  }
};

export default reducer;
