import { Heading } from "../../components/Heading";
import MUITable, {
  StyledTableCell,
  StyledTableRow,
} from "../../components/MUITable";
import Navbar from "../../components/Navbar";
import OverlayLoader from "../../components/Spinner/OverlayLoader";
import useTypedSelector from "../../hooks/useTypedSelector";
import { formatDate, formatTime, maskingPhoneNumber } from "../../utils";
import { useUserAppointmentsQuery } from "../../redux/api/userSlice";
import { selectedUserId } from "../../redux/auth/authSlice";
import { Box } from "@mui/material";
import CustomChip from "../../components/CustomChip";
import { IoBookOutline } from "react-icons/io5";

const tableHead = ["Id", "Doctor", "Phone", "Date", "Status"];

const Appointments = () => {
  const userId = useTypedSelector(selectedUserId);

  const { data, isLoading, isSuccess } = useUserAppointmentsQuery({
    userId,
  });

  return (
    <>
      {isLoading && <OverlayLoader />}

      <Navbar>
        <Heading>Appointments</Heading>
        <Box
          sx={{
            margin: "20px 0",
            boxShadow: "rgba(0, 0, 0, 0.16) 3px 16px 87px 0px",
          }}
        >
          <MUITable tableHead={tableHead}>
            {isSuccess && data.data.length > 0 ? (
              data.data.map((row: any) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell>{row._id}</StyledTableCell>
                  <StyledTableCell>{`${row.doctorInfo?.prefix} ${row.doctorInfo?.fullName}`}</StyledTableCell>
                  <StyledTableCell>
                    {maskingPhoneNumber(row?.doctorInfo?.phoneNumber)}
                  </StyledTableCell>
                  <StyledTableCell>{`${formatDate(row?.date)} ${formatTime(
                    row?.time
                  )}`}</StyledTableCell>
                  <StyledTableCell>
                    <CustomChip
                      label={
                        row.status === "pending"
                          ? "Pending"
                          : row.status === "approved"
                          ? "Approved"
                          : row.status === "rejected"
                          ? "Cancelled"
                          : ""
                      }
                    />
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
                    {data?.data?.length === 0 ? "No records found" : ""}
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </MUITable>
        </Box>
      </Navbar>
    </>
  );
};

export default Appointments;
