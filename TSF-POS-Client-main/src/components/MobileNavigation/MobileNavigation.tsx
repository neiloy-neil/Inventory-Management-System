import { useNavigate, useLocation } from "react-router-dom";
import {
  Home as HomeIcon,
  Store as StoreIcon,
  ShoppingCart as CartIcon,
  Assessment as ReportIcon,
  Person as ProfileIcon
} from "@mui/icons-material";
import "./MobileNavigation.scss";

const MobileNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: "home", label: "Home", icon: <HomeIcon />, path: "/" },
    { id: "products", label: "Products", icon: <StoreIcon />, path: "/products" },
    { id: "sales", label: "Sales", icon: <CartIcon />, path: "/sales" },
    { id: "reports", label: "Reports", icon: <ReportIcon />, path: "/reports" },
    { id: "profile", label: "Profile", icon: <ProfileIcon />, path: "/users" }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="mobile-navigation">
      <div className="mobile-nav-container">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => handleNavigation(item.path)}
            aria-label={item.label}
          >
            <div className="nav-icon">{item.icon}</div>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;