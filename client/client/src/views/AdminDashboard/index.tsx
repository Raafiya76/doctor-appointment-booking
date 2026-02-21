import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut } from "../../redux/auth/authSlice";
import { AiOutlineMenu } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import AdminUsers from "./components/AdminUsers";
import AdminDoctors from "./components/AdminDoctors";
import AdminAppointments from "./components/AdminAppointments";

const DRAWER_WIDTH = 250;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("users");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    dispatch(LogOut());
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleMenuOpen = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderContent = () => {
    switch (currentSection) {
      case "users":
        return <AdminUsers />;
      case "doctors":
        return <AdminDoctors />;
      case "appointments":
        return <AdminAppointments />;
      default:
        return <AdminUsers />;
    }
  };

  const drawerContent = (
    <Box>
      <Box
        sx={{
          p: 2,
          bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Admin Panel
        </Typography>
      </Box>
      <List>
        {[
          { label: "Users", value: "users" },
          { label: "Doctors", value: "doctors" },
          { label: "Appointments", value: "appointments" },
        ].map((item) => (
          <ListItem key={item.value} disablePadding>
            <ListItemButton
              selected={currentSection === item.value}
              onClick={() => {
                setCurrentSection(item.value);
                setMobileOpen(false);
              }}
              sx={{
                bgcolor:
                  currentSection === item.value
                    ? "rgba(102, 126, 234, 0.1)"
                    : "transparent",
                borderLeft:
                  currentSection === item.value ? "4px solid #667eea" : "none",
                "&:hover": {
                  bgcolor: "rgba(102, 126, 234, 0.05)",
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <Box sx={{ width: 250 }}>{drawerContent}</Box>
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* AppBar */}
        <AppBar
          position="static"
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <AiOutlineMenu size={24} />
            </IconButton>
            <Typography variant="h6" sx={{ flex: 1, fontWeight: "bold" }}>
              YaseenCareBook - Admin Dashboard
            </Typography>
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <MdLogout size={20} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Content Area */}
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: { xs: 1, md: 2 },
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
