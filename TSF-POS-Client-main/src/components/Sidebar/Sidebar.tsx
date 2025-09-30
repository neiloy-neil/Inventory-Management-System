import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "../../assets/sisters_furniture_logo.jpeg";
import sidebarLinks from "../../constants/sidebar/sidebarLinks";
import { useNavigate } from "react-router-dom";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import useAdminPermission from "../../hooks/permission/useAdminPermission";
import { useSelector } from "react-redux";
import { StateType } from "../../redux/redux";

const drawerWidth = 250;

interface Props {
  window?: () => Window;
  children: React.ReactNode;
  title?: string;
  hideBar: boolean;
}

export default function Sidebar(props: Props) {
  const { user } = useSelector((state: StateType) => state.user);
  const isAdmin = useAdminPermission();
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLinkClick = (link: string) => {
    navigate(link);
  };

  const drawer = (
    <div className="modern-sidebar">
      <div className="modern-sidebar-header">
        <img src={logo} alt="Logo" className="modern-sidebar-logo" />
      </div>
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
      <List className="modern-sidebar-nav">
        {sidebarLinks.map((link, index) => {
          if (link.adminOnlyPermission && !isAdmin) return null;
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton 
                onClick={() => handleLinkClick(link.link)}
                className="modern-sidebar-link"
              >
                <ListItemIcon className="modern-sidebar-icon" sx={{ color: "inherit" }}>
                  <link.icon />
                </ListItemIcon>
                <ListItemText
                  primary={link.name}
                  sx={{ 
                    fontFamily: "Poppins",
                    color: "inherit",
                    "& .MuiTypography-root": {
                      color: "inherit"
                    }
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
        {!isAdmin && (
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => navigate(`/branch/${user.branch}`)}
              className="modern-sidebar-link"
            >
              <ListItemIcon className="modern-sidebar-icon" sx={{ color: "inherit" }}>
                <StoreMallDirectoryIcon />
              </ListItemIcon>
              <ListItemText
                primary={"My Branch"}
                sx={{ 
                  fontFamily: "Poppins",
                  color: "inherit",
                  "& .MuiTypography-root": {
                    color: "inherit"
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {!props.hideBar && (
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            backgroundColor: "white",
            color: "black",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Toolbar className="modern-flex modern-flex-between">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: 2, 
                display: { sm: "none" },
                color: "var(--gray-700)"
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              variant="h6" 
              noWrap 
              component="div"
              sx={{ fontWeight: 600 }}
            >
              {props.title ? props.title : "The Sisters Furniture"}
            </Typography>
            <div></div> {/* Spacer for flex alignment */}
          </Toolbar>
        </AppBar>
      )}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          m: props.hideBar ? 0 : 3,
          mt: props.hideBar ? 0 : 10,
          fontSize: 16,
          position: "relative",
          height: "97vh",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "var(--gray-100)",
          padding: { xs: 2, sm: 3 },
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}