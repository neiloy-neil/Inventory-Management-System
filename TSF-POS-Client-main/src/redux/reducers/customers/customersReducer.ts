import { Customer } from "../../../types/Customer/customerTypes";
import {
  CUSTOMERS_LOADING,
  CUSTOMERS_SUCCESS,
  CUSTOMERS_ERROR,
  ADD_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_SUCCESS,
} from "../../../constants/reduxActionsNames/customers";

// Define the state interface
export interface CustomersState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: CustomersState = {
  customers: [],
  loading: false,
  error: null,
};

// Action types
interface CustomersLoadingAction {
  type: typeof CUSTOMERS_LOADING;
}

interface CustomersSuccessAction {
  type: typeof CUSTOMERS_SUCCESS;
  payload: Customer[];
}

interface CustomersErrorAction {
  type: typeof CUSTOMERS_ERROR;
  payload: string;
}

interface AddCustomerSuccessAction {
  type: typeof ADD_CUSTOMER_SUCCESS;
  payload: Customer;
}

interface UpdateCustomerSuccessAction {
  type: typeof UPDATE_CUSTOMER_SUCCESS;
  payload: Customer;
}

interface DeleteCustomerSuccessAction {
  type: typeof DELETE_CUSTOMER_SUCCESS;
  payload: string;
}

type CustomersActionTypes =
  | CustomersLoadingAction
  | CustomersSuccessAction
  | CustomersErrorAction
  | AddCustomerSuccessAction
  | UpdateCustomerSuccessAction
  | DeleteCustomerSuccessAction;

// Reducer
const customersReducer = (
  state = initialState,
  action: CustomersActionTypes
): CustomersState => {
  switch (action.type) {
    case CUSTOMERS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CUSTOMERS_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: action.payload,
        error: null,
      };
    case CUSTOMERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: [...state.customers, action.payload],
        error: null,
      };
    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: state.customers.map((customer) =>
          customer._id === action.payload._id ? action.payload : customer
        ),
        error: null,
      };
    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: state.customers.filter(
          (customer) => customer._id !== action.payload
        ),
        error: null,
      };
    default:
      return state;
  }
};

export default customersReducer;