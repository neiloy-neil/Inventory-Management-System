import { CLEAR_ERROR } from "../../constants/reduxActionsNames/user";
import {
  USERS_ERROR,
  USERS_PENDING,
  USERS_SUCCESS,
} from "../../constants/reduxActionsNames/users";
import { ReduxAction } from "../redux";

const usersReducer = (state = {}, action: ReduxAction) => {
  switch (action.type) {
    case USERS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case USERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default usersReducer;
