import { Link } from "react-router-dom";
import { Box, Button, Typography, AppBar, Toolbar } from "@mui/material";

const Landing = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "#fff",
          borderBottom: "1px solid #eee",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              fontSize: "20px",
              color: "#333",
            }}
          >
            YaseenCareBook
          </Typography>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Button
              component={Link}
              to="/"
              sx={{
                color: "#333",
                fontWeight: "500",
                fontSize: "14px",
                textTransform: "none",
                "&:hover": { backgroundColor: "transparent", color: "#1976d2" },
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/login"
              sx={{
                color: "#333",
                fontWeight: "500",
                fontSize: "14px",
                textTransform: "none",
                "&:hover": { backgroundColor: "transparent", color: "#1976d2" },
              }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/signup"
              sx={{
                color: "#333",
                fontWeight: "500",
                fontSize: "14px",
                textTransform: "none",
                "&:hover": { backgroundColor: "transparent", color: "#1976d2" },
              }}
            >
              Register
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          flex: 1,
          background: "#c8d8d4",
          display: "flex",
          alignItems: "center",
          padding: "40px 60px",
        }}
      >
        {/* Left Side - Doctor Image */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <img
            src="https://img.freepik.com/free-photo/team-young-specialist-doctors-standing-corridor-hospital_1303-21199.jpg"
            alt="Doctors"
            style={{
              maxWidth: "100%",
              maxHeight: "500px",
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Right Side - Content */}
        <Box
          sx={{
            flex: 1,
            paddingLeft: "40px",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#333",
              fontSize: { xs: "28px", sm: "36px", md: "42px" },
              lineHeight: "1.3",
              marginBottom: "10px",
            }}
          >
            Effortlessly schedule your doctor
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#333",
              fontSize: { xs: "20px", sm: "24px", md: "28px" },
              marginBottom: "8px",
            }}
          >
            appointments with just a few clicks,
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#555",
              fontSize: "18px",
              marginBottom: "30px",
            }}
          >
            putting your health in your hands.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/login"
            sx={{
              backgroundColor: "#2196f3",
              color: "#fff",
              fontWeight: "500",
              padding: "12px 28px",
              fontSize: "16px",
              textTransform: "none",
              borderRadius: "4px",
              "&:hover": {
                backgroundColor: "#1976d2",
              },
            }}
          >
            Book your Doctor
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;
