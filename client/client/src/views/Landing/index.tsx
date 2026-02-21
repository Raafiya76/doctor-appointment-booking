import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";

const Landing = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              fontSize: "24px",
              letterSpacing: "1px",
            }}
          >
            YaseenCareBook
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{
                fontWeight: "600",
                fontSize: "14px",
                textTransform: "none",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/signup"
              sx={{
                fontWeight: "600",
                fontSize: "14px",
                textTransform: "none",
                backgroundColor: "rgba(255,255,255,0.2)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
              }}
              variant="outlined"
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
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          padding: "40px 20px",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              marginBottom: "20px",
              fontSize: { xs: "32px", sm: "48px", md: "56px" },
              lineHeight: "1.2",
            }}
          >
            Effortlessly Schedule Your Doctor Appointments
          </Typography>
          <Typography
            variant="h6"
            sx={{
              marginBottom: "40px",
              fontSize: "18px",
              fontWeight: "300",
              maxWidth: "600px",
              margin: "0 auto 40px",
              lineHeight: "1.6",
            }}
          >
            Connect with experienced doctors, book appointments in just a few
            clicks, and manage your healthcare efficiently.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/signup"
            sx={{
              backgroundColor: "white",
              color: "#667eea",
              fontWeight: "bold",
              padding: "12px 40px",
              fontSize: "16px",
              textTransform: "none",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            Book Your Doctor
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
