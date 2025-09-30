import {
  BRANCH_PENDING,
  BRANCH_SUCCESS,
  BRANCH_ERROR,
  BRANCH_ADD_PENDING,
  BRANCH_ADD_SUCCESS,
  BRANCH_ADD_ERROR,
  ADD_PRODUCT_TO_BRANCH_PENDING,
  ADD_PRODUCT_TO_BRANCH_SUCCESS,
  ADD_PRODUCT_TO_BRANCH_ERROR,
  CLEAR_BRANCH_MESSAGES,
} from "./../../constants/reduxActionsNames/branch/index";

import {
  CLEAR_BRANCH,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
} from "../../constants/reduxActionsNames/user";
import { ReduxAction } from "../redux";

const branchReducer = (state = {}, action: ReduxAction) => {
  switch (action.type) {
    case BRANCH_PENDING:
      return {
        ...state,
        loading: true,
      };
    case BRANCH_SUCCESS:
      return {
        ...state,
        branch: action.payload,
        loading: false,
      };
    case BRANCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // branch add case
    case BRANCH_ADD_PENDING:
      return {
        ...state,
        loading: true,
      };
    case BRANCH_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case BRANCH_ADD_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // add product to branch
    case ADD_PRODUCT_TO_BRANCH_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ADD_PRODUCT_TO_BRANCH_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case ADD_PRODUCT_TO_BRANCH_ERROR:
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
    case CLEAR_BRANCH_MESSAGES:
      return {
        ...state,
        message: null,
        error: null,
      };

    case CLEAR_SUCCESS:
      return {
        ...state,
        message: null,
      };

    case CLEAR_BRANCH:
      return {};

    default:
      return state;
  }
};

export default branchReducer;
