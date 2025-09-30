// conponent for routes
import Branch from "../pages/Branch";
import BranchValuation from "../pages/BranchValuation/BranchValuation";
import Branches from "../pages/Branches/Branches";
import CustomOrder from "../pages/CustomOrder";
import CustomOrderInvoice from "../pages/CustomOrderInvoice";
import Dashboard from "../pages/Dashboard";
import Expenses from "../pages/Expenses";
import ForgotPassword from "../pages/ForgotPassword";
import InvoicePage from "../pages/Invoice";
import Login from "../pages/Login";
import Logout from "../pages/Logout/Logout";
import OrderInformation from "../pages/OrderInformation/OrderInformation";
import Product from "../pages/Product";
import Products from "../pages/Products";
import ResetPassword from "../pages/ResetPassword";
import Sale from "../pages/Sale";
import Sales from "../pages/Sales/index";
import SearchProduct from "../pages/SearchProduct";
import TransferStock from "../pages/TransferStock";
import Users from "../pages/Users";
import Customers from "../pages/Customers";
import Inventory from "../pages/Inventory";
import Reports from "../pages/Reports";

// types of route object
import { Route } from "./types";

const routes: Route[] = [
  {
    path: "/",
    component: Dashboard,
    secured: true,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/reset-password/:token",
    component: ResetPassword,
  },
  {
    path: "/users",
    component: Users,
    secured: true,
  },
  {
    path: "/customers",
    component: Customers,
    secured: true,
  },
  {
    path: "/inventory",
    component: Inventory,
    secured: true,
  },
  {
    path: "/branches",
    component: Branches,
    secured: true,
  },
  {
    path: "/branch-valuation",
    component: BranchValuation,
    secured: true,
  },
  {
    path: "/branch/:id",
    component: Branch,
    secured: true,
  },
  {
    path: "/products",
    component: Products,
    secured: true,
  },
  {
    path: "/product/:id",
    component: Product,
    secured: true,
  },
  {
    path: "/search",
    component: SearchProduct,
    secured: true,
  },
  {
    path: "/transfer-stock",
    component: TransferStock,
    secured: true,
  },
  {
    path: "/sale",
    component: Sale,
    secured: true,
  },
  {
    path: "/custom-order",
    component: CustomOrder,
    secured: true,
  },
  {
    path: "/order/:id",
    component: OrderInformation,
    secured: true,
  },
  {
    path: "/sales",
    component: Sales,
    secured: true,
  },
  {
    path: "/expenses",
    component: Expenses,
    secured: true,
  },
  {
    path: "/invoice/:id",
    component: InvoicePage,
    secured: true,
  },
  {
    path: "/custom-order-invoice/:id",
    component: CustomOrderInvoice,
    secured: true,
  },
  {
    path: "/logout",
    component: Logout,
    secured: true,
  },
  {
    path: "/reports",
    component: Reports,
    secured: true,
  },
];

export default routes;