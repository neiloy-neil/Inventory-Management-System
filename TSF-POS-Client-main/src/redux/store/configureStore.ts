import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userReducer from "../reducers/userReducer";
import promiseReducer from "../reducers/promiseReducer";
import usersReducer from "../reducers/usersReducer";
import branchesReducer from "../reducers/branchListReducer";
import branchReducer from "../reducers/branchReducer";
import productReducer from "../reducers/productReducer";
import productsReducer from "../reducers/productsReducer";
import cartReducer from "../reducers/cartReducer";
import saleReducer from "../reducers/saleReducer";
import salesReducer from "../reducers/salesListReducer";
import partialPaymentReducer from "../reducers/partialPaymentReducer";
import dashboardReducer from "../reducers/dashboardReducer";
import expensesListReducer from "../reducers/expensesListReducer";
import customOrderReducer from "../reducers/customOrderReducer";
import branchValuationReducer from "../reducers/branchValuationReducer";
import customersReducer from "../reducers/customers/customersReducer";
import inventoryReducer from "../reducers/inventory/inventoryReducer";

//persist config for persistor
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", ""], // only navigation will be persisted
};

// conbine reducers here
const reducers = combineReducers({
  dashboard: dashboardReducer,
  user: userReducer,
  users: usersReducer,
  branch: branchReducer,
  branches: branchesReducer,
  product: productReducer,
  products: productsReducer,
  cart: cartReducer,
  sale: saleReducer,
  sales: salesReducer,
  expenses: expensesListReducer,
  partialPayment: partialPaymentReducer,
  customOrder: customOrderReducer,
  branchValuation: branchValuationReducer,
  promise: promiseReducer,
  customers: customersReducer,
  inventory: inventoryReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (gDM) => gDM().concat(logger),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>;
export { store, persistor };