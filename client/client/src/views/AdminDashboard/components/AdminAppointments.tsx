import { useState } from "react";
import { Box, Card, Tooltip } from "@mui/material";
import { Heading } from "../../../components/Heading";
import MUITable, {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/MUITable";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import Spinner from "../../../components/Spinner";
import ToastAlert from "../../../components/ToastAlert/ToastAlert";
import CustomChip from "../../../components/CustomChip";
import { IoBookOutline } from "react-icons/io5";
import { formatDate, formatTime, maskingPhoneNumber } from "../../../utils";
import {
  useGetAllAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
} from "../../../redux/api/userSlice";
import { MdDone, MdClose, MdSchedule } from "react-icons/md";

const tableHead = [
  "Appointment ID",
  "User Name",
  "Doctor Name",
  "Date",
  "Status",
  "Actions",
];

const AdminAppointments = () => {
  const [appointmentId, setAppointmentId] = useState("");
  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const { data, isLoading, isSuccess } = useGetAllAppointmentsQuery({});
  const [updateStatus, { isLoading: updating }] =
    useUpdateAppointmentStatusMutation();

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  const handleStatusUpdate = async (appointment: any, newStatus: string) => {
    try {
      const result: any = await updateStatus({
        appointmentId: appointment._id,
        status: newStatus,
      });

      if (result?.data?.status) {
        setToast({
          message: "Appointment Status Updated Successfully",
          appearence: true,
          type: "success",
        });
      } else {
        setToast({
          message: result?.error?.data?.message || "Failed to update status",
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Status Update Error:", error);
      setToast({
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  return (
    <Card sx={{ p: 2 }}>
      {isLoading && <OverlayLoader />}

      <Heading sx={{ mb: 2 }}>All Appointments</Heading>

      <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.16) 3px 16px 87px 0px" }}>
        <MUITable tableHead={tableHead}>
          {isSuccess && data?.data?.length > 0 ? (
            data?.data?.map((row: any) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell>{row._id.substring(0, 8)}...</StyledTableCell>
                <StyledTableCell>{row.userInfo?.name}</StyledTableCell>
                <StyledTableCell>{`${row.doctorInfo?.prefix} ${row.doctorInfo?.fullName}`}</StyledTableCell>
                <StyledTableCell>
                  {`${formatDate(row?.date)} ${formatTime(row?.time)}`}
                </StyledTableCell>
                <StyledTableCell>
                  <CustomChip
                    label={
                      row.status === "pending"
                        ? "Pending"
                        : row.status === "approved"
                          ? "Approved"
                          : row.status === "rejected"
                            ? "Rejected"
                            : ""
                    }
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {row.status === "pending" && (
                      <>
                        <Tooltip title="Approve">
                          <Box
                            sx={{
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              p: 0.5,
                              borderRadius: "4px",
                              "&:hover": { bgcolor: "rgba(76, 175, 80, 0.1)" },
                            }}
                            onClick={() => {
                              handleStatusUpdate(row, "approved");
                              setAppointmentId(row._id);
                            }}
                          >
                            {appointmentId === row._id && updating ? (
                              <Spinner size={20} />
                            ) : (
                              <MdDone
                                style={{ fontSize: "20px", color: "green" }}
                              />
                            )}
                          </Box>
                        </Tooltip>
                        <Tooltip title="Reject">
                          <Box
                            sx={{
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              p: 0.5,
                              borderRadius: "4px",
                              "&:hover": { bgcolor: "rgba(244, 67, 54, 0.1)" },
                            }}
                            onClick={() => {
                              handleStatusUpdate(row, "rejected");
                              setAppointmentId(row._id);
                            }}
                          >
                            {appointmentId === row._id && updating ? (
                              <Spinner size={20} />
                            ) : (
                              <MdClose
                                style={{ fontSize: "20px", color: "red" }}
                              />
                            )}
                          </Box>
                        </Tooltip>
                      </>
                    )}
                    {row.status !== "pending" && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <MdSchedule style={{ color: "#666" }} />
                        <span style={{ color: "#666", fontSize: "12px" }}>
                          {row.status}
                        </span>
                      </Box>
                    )}
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell
                sx={{ height: "100px" }}
                colSpan={tableHead?.length}
                align="center"
              >
                <Box
                  sx={{
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <IoBookOutline />
                  {data?.data?.length === 0 ? "No appointments found" : ""}
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          )}
        </MUITable>
      </Box>

      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </Card>
  );
};

export default AdminAppointments;
