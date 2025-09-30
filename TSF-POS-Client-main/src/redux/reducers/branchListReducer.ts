import {
  BRANCHES_ERROR,
  BRANCHES_PENDING,
  BRANCHES_SUCCESS,
} from "../../constants/reduxActionsNames/branches";
import { CLEAR_ERROR } from "../../constants/reduxActionsNames/user";
import { ReduxAction } from "../redux";

const branchesReducer = (state = {}, action: ReduxAction) => {
  switch (action.type) {
    case BRANCHES_PENDING:
      return {
        ...state,
        loading: true,
      };
    case BRANCHES_SUCCESS:
      return {
        ...state,
        loading: false,
        branches: action.payload,
        loaded: true,
      };
    case BRANCHES_ERROR:
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

export default branchesReducer;
