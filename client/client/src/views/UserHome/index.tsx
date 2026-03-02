import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  LogOut,
  selectedUserId,
  selectedUserName,
  selectedUserEmail,
  selectedUserPhoneNumber,
} from "../../redux/auth/authSlice";
import { useGetApprovedDoctorsQuery } from "../../redux/api/doctorSlice";
import { useCreateAppointmentMutation } from "../../redux/api/userSlice";
import useTypedSelector from "../../hooks/useTypedSelector";
import OverlayLoader from "../../components/Spinner/OverlayLoader";
import ToastAlert from "../../components/ToastAlert/ToastAlert";
import { FaCalendarAlt, FaUserMd, FaSignOutAlt } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import BookingModal from "./components/BookingModal";

const UserHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useTypedSelector(selectedUserId);
  const userName = useTypedSelector(selectedUserName);
  const userEmail = useTypedSelector(selectedUserEmail);
  const userPhone = useTypedSelector(selectedUserPhoneNumber);

  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [openBooking, setOpenBooking] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const { data, isLoading, refetch } = useGetApprovedDoctorsQuery({});
  const [createAppointment, { isLoading: bookingLoading }] =
    useCreateAppointmentMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleLogout = () => {
    dispatch(LogOut());
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleBookNow = (doctor: any) => {
    setSelectedDoctor(doctor);
    setOpenBooking(true);
  };

  const handleBookAppointment = async (dateTime: string, file: File | null) => {
    if (!dateTime) {
      setToast({
        message: "Please select date and time",
        appearence: true,
        type: "error",
      });
      return;
    }

    try {
      const payload = {
        userId,
        doctorId: selectedDoctor.userId,
        userInfo: {
          name: userName,
          email: userEmail,
          phoneNumber: userPhone,
        },
        doctorInfo: {
          userId: selectedDoctor.userId,
          prefix: selectedDoctor.prefix,
          fullName: selectedDoctor.fullName,
          phoneNumber: selectedDoctor.phoneNumber,
          specialization: selectedDoctor.specialization,
        },
        date: dateTime,
        time: dateTime,
        status: "pending",
      };

      const result: any = await createAppointment(payload);

      if (result?.data?.status === "success" || result?.data?.status) {
        setToast({
          message: "Appointment book successfully",
          appearence: true,
          type: "success",
        });
        setOpenBooking(false);
        setSelectedDoctor(null);
      } else {
        setToast({
          message: result?.error?.data?.message || "Failed to book appointment",
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      setToast({
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  const formatTime = (time: string) => {
    if (!time) return "";
    // Handle ISO datetime strings
    if (time.includes("T")) {
      const date = new Date(time);
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }
    return time;
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {isLoading && <OverlayLoader />}

      {/* Sidebar */}
      <Box
        sx={{
          width: 200,
          bgcolor: "#1a4b8c",
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ p: 2, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontSize: "16px" }}
          >
            YaseenCareBook
          </Typography>
        </Box>

        <Box sx={{ flex: 1, pt: 2 }}>
          <Box
            onClick={() => navigate("/userhome/userappointments")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2,
              py: 1.5,
              cursor: "pointer",
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            <FaCalendarAlt size={16} />
            <Typography fontSize="14px">Appointments</Typography>
          </Box>

          <Box
            onClick={() => navigate("/apply-doctor")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2,
              py: 1.5,
              cursor: "pointer",
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            <FaUserMd size={16} />
            <Typography fontSize="14px">Apply doctor</Typography>
          </Box>

          <Box
            onClick={handleLogout}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              px: 2,
              py: 1.5,
              cursor: "pointer",
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            <FaSignOutAlt size={16} />
            <Typography fontSize="14px">Logout</Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, bgcolor: "#f5f5f5" }}>
        {/* Header */}
        <Box
          sx={{
            bgcolor: "white",
            px: 3,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #eee",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IoNotifications size={20} />
            <Typography fontWeight="bold">{userName}</Typography>
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              p: 3,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h5"
              sx={{ textAlign: "center", mb: 3, fontWeight: 500 }}
            >
              Home
            </Typography>

            {/* Doctor Cards */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {data?.data && data.data.length > 0 ? (
                data.data.map((doctor: any) => (
                  <Box
                    key={doctor._id}
                    sx={{
                      border: "1px solid #ddd",
                      borderRadius: 1,
                      p: 2,
                      minWidth: 280,
                      maxWidth: 320,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", mb: 1, fontSize: "16px" }}
                    >
                      {doctor.prefix} {doctor.fullName}
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Phone:</strong> {doctor.phoneNumber}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Address:</strong> {doctor.address}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Specialization:</strong> {doctor.specialization}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Experience:</strong> {doctor.experience}{" "}
                      {doctor.experience.toString().includes("year")
                        ? ""
                        : "Yrs"}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Fees:</strong> {doctor.feePerConsultation}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1.5 }}>
                      <strong>Timing:</strong> {formatTime(doctor.fromTime)} :{" "}
                      {formatTime(doctor.toTime)}
                    </Typography>

                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleBookNow(doctor)}
                      sx={{
                        bgcolor: "#1976d2",
                        textTransform: "none",
                        "&:hover": { bgcolor: "#1565c0" },
                      }}
                    >
                      Book Now
                    </Button>
                  </Box>
                ))
              ) : (
                <Typography color="textSecondary">
                  No doctors available
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Booking Modal */}
      <BookingModal
        open={openBooking}
        onClose={() => {
          setOpenBooking(false);
          setSelectedDoctor(null);
        }}
        doctor={selectedDoctor}
        onBook={handleBookAppointment}
        isLoading={bookingLoading}
      />

      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={() => setToast({ ...toast, appearence: false })}
      />
    </Box>
  );
};

export default UserHome;
