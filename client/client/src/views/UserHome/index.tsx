import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Button,
  Grid,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut } from "../../redux/auth/authSlice";
import { AiOutlineMenu } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { Heading } from "../../components/Heading";
import { useGetApprovedDoctorsQuery } from "../../redux/api/doctorSlice";
import OverlayLoader from "../../components/Spinner/OverlayLoader";
import BookAppointmentModal from "./components/BookAppointmentModal";
import useTypedSelector from "../../hooks/useTypedSelector";
import { selectedUserId } from "../../redux/auth/authSlice";
import Appointments from "../Appointments";
import ApplyDoctor from "../ApplyDoctor";

const DRAWER_WIDTH = 250;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

const UserHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useTypedSelector(selectedUserId);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [openBooking, setOpenBooking] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const { data, isLoading, refetch } = useGetApprovedDoctorsQuery({});

  // Refetch approved doctors on component mount
  useEffect(() => {
    refetch();
  }, []);

  // Refetch approved doctors when Find Doctors tab is opened
  useEffect(() => {
    if (activeTab === 0) {
      refetch();
    }
  }, [activeTab, refetch]);

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

  const handleBookAppointment = (doctor: any) => {
    setSelectedDoctor(doctor);
    setOpenBooking(true);
  };

  const drawerContent = (
    <Box>
      <Box
        sx={{
          p: 2,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Patient Menu
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" sx={{ fontWeight: "bold", mb: 2 }}>
          Navigation
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button
            fullWidth
            variant={activeTab === 0 ? "contained" : "outlined"}
            onClick={() => {
              setActiveTab(0);
              setMobileOpen(false);
            }}
            sx={{
              background:
                activeTab === 0
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : "transparent",
            }}
          >
            Find Doctors
          </Button>
          <Button
            fullWidth
            variant={activeTab === 1 ? "contained" : "outlined"}
            onClick={() => {
              setActiveTab(1);
              setMobileOpen(false);
            }}
            sx={{
              background:
                activeTab === 1
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : "transparent",
            }}
          >
            My Appointments
          </Button>
          <Button
            fullWidth
            variant={activeTab === 2 ? "contained" : "outlined"}
            onClick={() => {
              setActiveTab(2);
              setMobileOpen(false);
            }}
            sx={{
              background:
                activeTab === 2
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : "transparent",
            }}
          >
            Apply as Doctor
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Desktop Sidebar */}
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
              YaseenCareBook - Find Your Doctor
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
          {isLoading && <OverlayLoader />}

          {/* Tab 0: Find Doctors */}
          <TabPanel value={activeTab} index={0}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Heading>Available Doctors</Heading>
              <Button 
                size="small"
                variant="outlined"
                onClick={() => refetch()}
              >
                Refresh Doctors
              </Button>
            </Box>

            {isLoading ? (
              <Card sx={{ p: 3, textAlign: "center" }}>
                <Typography color="textSecondary">
                  Loading doctors...
                </Typography>
              </Card>
            ) : data?.data && data.data.length > 0 ? (
              <Grid container spacing={2}>
                {data.data.map((doctor: any) => (
                  <Grid item xs={12} sm={6} md={4} key={doctor._id}>
                    <Card
                      sx={{
                        p: 2,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 1 }}
                      >
                        {`${doctor.prefix} ${doctor.fullName}`}
                      </Typography>

                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Specialization:</strong>{" "}
                          {doctor.specialization}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Experience:</strong> {doctor.experience}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Fees:</strong> ${doctor.feePerConsultation}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Address:</strong> {doctor.address}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>Timings:</strong> {doctor.fromTime} -{" "}
                          {doctor.toTime}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Phone:</strong> {doctor.phoneNumber}
                        </Typography>
                      </Box>

                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          mt: 2,
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        }}
                        onClick={() => handleBookAppointment(doctor)}
                      >
                        Book Now
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Card sx={{ p: 3, textAlign: "center" }}>
                <Typography color="textSecondary">
                  No doctors available at the moment
                </Typography>
              </Card>
            )}
          </TabPanel>

          {/* Tab 1: My Appointments */}
          <TabPanel value={activeTab} index={1}>
            <Appointments />
          </TabPanel>

          {/* Tab 2: Apply as Doctor */}
          <TabPanel value={activeTab} index={2}>
            <ApplyDoctor />
          </TabPanel>
        </Box>
      </Box>

      {/* Booking Modal */}
      <BookAppointmentModal
        open={openBooking}
        onClose={() => setOpenBooking(false)}
        doctor={selectedDoctor}
        userId={userId}
      />
    </Box>
  );
};

export default UserHome;
