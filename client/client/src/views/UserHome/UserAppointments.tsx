import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  LogOut,
  selectedUserId,
  selectedUserName,
} from "../../redux/auth/authSlice";
import { useUserAppointmentsQuery } from "../../redux/api/userSlice";
import useTypedSelector from "../../hooks/useTypedSelector";
import OverlayLoader from "../../components/Spinner/OverlayLoader";
import { FaCalendarAlt, FaUserMd, FaSignOutAlt } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import moment from "moment";

const UserAppointments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useTypedSelector(selectedUserId);
  const userName = useTypedSelector(selectedUserName);

  const { data, isLoading } = useUserAppointmentsQuery(
    { userId },
    { skip: !userId },
  );

  const handleLogout = () => {
    dispatch(LogOut());
    localStorage.removeItem("user");
    navigate("/login");
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
            onClick={() => navigate("/userhome")}
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
            onClick={() => navigate("/userhome")}
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
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                py: 2,
                borderBottom: "1px solid #eee",
                fontWeight: 500,
              }}
            >
              All Appointments
            </Typography>

            {/* Table */}
            <Box sx={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8f9fa" }}>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      Doctor Name
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      Date of Appointment
                    </th>
                    <th
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        fontWeight: 600,
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data && data.data.length > 0 ? (
                    data.data.map((appointment: any) => (
                      <tr key={appointment._id}>
                        <td
                          style={{
                            padding: "12px 16px",
                            borderBottom: "1px solid #eee",
                          }}
                        >
                          {appointment.doctorInfo?.fullName ||
                            appointment.doctorInfo?.name ||
                            "N/A"}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            borderBottom: "1px solid #eee",
                          }}
                        >
                          {moment(appointment.date).format("YYYY-MM-DD")}{" "}
                          {moment(appointment.time).format("HH:mm")}
                        </td>
                        <td
                          style={{
                            padding: "12px 16px",
                            borderBottom: "1px solid #eee",
                          }}
                        >
                          {appointment.status}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          padding: "24px 16px",
                          textAlign: "center",
                          color: "#666",
                        }}
                      >
                        No appointments found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserAppointments;
