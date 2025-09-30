import DashboardIcon from "@mui/icons-material/Dashboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupIcon from "@mui/icons-material/Group";
import ChairIcon from "@mui/icons-material/Chair";
import SearchIcon from "@mui/icons-material/Search";
import MoveUpIcon from "@mui/icons-material/MoveUp";
import SellIcon from "@mui/icons-material/Sell";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PaidIcon from "@mui/icons-material/Paid";
import ConstructionIcon from "@mui/icons-material/Construction";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssessmentIcon from "@mui/icons-material/Assessment";

import { SidebarLinkType } from "./types";

const sidebarLinks: SidebarLinkType[] = [
  { name: "Dashboard", icon: DashboardIcon, link: "/" },
  {
    name: "All Products",
    icon: ChairIcon,
    link: "/products",
    adminOnlyPermission: true,
  },
  { name: "Sale", icon: SellIcon, link: "/sale" },
  { name: "Custom Order", icon: ConstructionIcon, link: "/custom-order" },
  { name: "Sale List", icon: FormatListBulletedIcon, link: "/sales" },
  { name: "Expenses", icon: PaidIcon, link: "/expenses" },
  { name: "Search Product", icon: SearchIcon, link: "/search" },
  {
    name: "Transfer Stock",
    icon: MoveUpIcon,
    link: "/transfer-stock",
    adminOnlyPermission: true,
  },
  {
    name: "Branch Valuation",
    icon: LocalAtmIcon,
    link: "/branch-valuation",
    adminOnlyPermission: true,
  },
  {
    name: "Branches",
    icon: StorefrontIcon,
    link: "/branches",
    adminOnlyPermission: true,
  },
  { name: "Customers", icon: PeopleIcon, link: "/customers", adminOnlyPermission: true },
  { name: "Inventory", icon: InventoryIcon, link: "/inventory", adminOnlyPermission: true },
  { name: "Reports", icon: AssessmentIcon, link: "/reports", adminOnlyPermission: true },
  { name: "Users", icon: GroupIcon, link: "/users", adminOnlyPermission: true },
  { name: "Logout", icon: LogoutIcon, link: "/logout" },
];

export default sidebarLinks;