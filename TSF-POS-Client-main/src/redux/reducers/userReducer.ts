import {
  DELETE_MODERATOR_ERROR,
  DELETE_MODERATOR_PENDING,
  DELETE_MODERATOR_SUCCESS,
} from "../../constants/reduxActionsNames/moderator";
import {
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
} from "../../constants/reduxActionsNames/user";
import { ReduxAction } from "../redux";

const userReducer = (state = {}, action: ReduxAction) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        loading: true,
      };
    case DELETE_MODERATOR_PENDING:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        user: action.payload,
      };
    case DELETE_MODERATOR_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_MODERATOR_ERROR:
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
    case CLEAR_SUCCESS:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};

export default userReducer;
