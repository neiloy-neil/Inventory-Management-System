import {
  PROMISE_DESTROY,
  PROMISE_ERROR,
  PROMISE_PENDING,
  PROMISE_SUCCESS,
} from "../../constants/reduxActionsNames/promise";
import { ReduxAction } from "../redux";

const promiseReducer = (state = {}, action: ReduxAction) => {
  switch (action.type) {
    case PROMISE_PENDING:
      return {
        ...state,
        loading: true,
      };
    case PROMISE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case PROMISE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PROMISE_DESTROY:
      return {};

    default:
      return state;
  }
};

export default promiseReducer;
