import { useState } from "react";
import { Box, Card, Tooltip } from "@mui/material";
import {
  useChangeDoctorStatusMutation,
  useGetAllDoctorsQuery,
} from "../../../redux/api/doctorSlice";
import { Heading } from "../../../components/Heading";
import MUITable, {
  StyledTableRow,
  StyledTableCell,
} from "../../../components/MUITable";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import Spinner from "../../../components/Spinner";
import ToastAlert from "../../../components/ToastAlert/ToastAlert";
import CustomChip from "../../../components/CustomChip";
import { IoBookOutline } from "react-icons/io5";
import { formatDateTime, maskingPhoneNumber } from "../../../utils";
import { TiTickOutline } from "react-icons/ti";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";

const tableHead = [
  "Name",
  "Specialty",
  "Email",
  "Phone Number",
  "Date",
  "Status",
  "Actions",
];

const AdminDoctors = () => {
  const [doctorId, setDoctorId] = useState("");
  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const { data, isLoading, isSuccess } = useGetAllDoctorsQuery({});

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  const [doctorStatus, { isLoading: doctorLoading }] =
    useChangeDoctorStatusMutation();

  const doctorHandler = async (data: any, status: string) => {
    try {
      const payload = {
        doctorId: data._id,
        status: status,
        userId: data.userId,
      };

      const doctor: any = await doctorStatus(payload);

      if (doctor?.data?.status) {
        setToast({
          message: "Doctor Status Changed Successfully",
          appearence: true,
          type: "success",
        });
      }
      if (doctor?.error) {
        setToast({
          message: doctor?.error?.data?.message,
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Doctor Status Changed Error:", error);
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

      <Heading sx={{ mb: 2 }}>All Doctors</Heading>

      <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.16) 3px 16px 87px 0px" }}>
        <MUITable tableHead={tableHead}>
          {isSuccess && data?.data?.length > 0 ? (
            data?.data?.map((row: any) => (
              <StyledTableRow key={`${row.email}`}>
                <StyledTableCell>{`${row.prefix} ${row.fullName}`}</StyledTableCell>
                <StyledTableCell>{row.specialization}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>
                  {maskingPhoneNumber(row.phoneNumber)}
                </StyledTableCell>
                <StyledTableCell>
                  {formatDateTime(row.createdAt)}
                </StyledTableCell>
                <StyledTableCell>
                  <CustomChip
                    label={
                      row.status === "pending"
                        ? "Pending"
                        : row.status === "approved"
                          ? "Approved"
                          : row.status === "blocked"
                            ? "Blocked"
                            : ""
                    }
                  />
                </StyledTableCell>
                <Tooltip
                  title={
                    row.status === "pending"
                      ? "Approve Doctor"
                      : row.status === "blocked"
                        ? "Unblock User"
                        : "Ban User"
                  }
                  placement="bottom"
                >
                  <StyledTableCell
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      doctorHandler(
                        row,
                        row.status === "pending"
                          ? "approved"
                          : row.status === "blocked"
                            ? "approved"
                            : "blocked",
                      );
                      setDoctorId(row._id);
                    }}
                  >
                    {doctorId === row._id && doctorLoading ? (
                      <Spinner size={20} />
                    ) : (
                      <>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "3px",
                          }}
                        >
                          <Box>
                            {row.status === "pending" ? (
                              <TiTickOutline style={{ fontSize: "20px" }} />
                            ) : row.status === "blocked" ? (
                              <CgUnblock style={{ fontSize: "17px" }} />
                            ) : (
                              <MdBlock />
                            )}
                          </Box>
                          <Box>
                            {row.status === "pending"
                              ? "Approve"
                              : row.status === "blocked"
                                ? "UnBlock"
                                : "Block"}
                          </Box>
                        </Box>
                      </>
                    )}
                  </StyledTableCell>
                </Tooltip>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow sx={{ height: "100px" }}>
              <StyledTableCell colSpan={tableHead?.length} align="center">
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
                  {data?.data?.length === 0 ? "No records found" : ""}
                </Box>{" "}
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

export default AdminDoctors;
