import dayjs from "dayjs";
import {
  CHANGE_BRANCH,
  CHANGE_FROM_DATE,
  CHANGE_TO_DATE,
} from "../../constants/reduxActionsNames/dashboard";
import { ReduxAction } from "../redux";

const dashboardReducer = (
  state = {
    fromDate: dayjs()
      .startOf("day")
      .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
      .toString(),
    toDate: dayjs()
      .endOf("day")
      .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
      .toString(),
  },
  action: ReduxAction
) => {
  switch (action.type) {
    case CHANGE_FROM_DATE:
      return {
        ...state,
        fromDate: action.payload,
      };
    case CHANGE_TO_DATE:
      return {
        ...state,
        toDate: action.payload,
      };
    case CHANGE_BRANCH:
      return {
        ...state,
        branch: action.payload,
      };

    default:
      return state;
  }
};

export default dashboardReducer;
