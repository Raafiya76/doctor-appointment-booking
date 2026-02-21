import { Box, Card } from "@mui/material";
import { Heading } from "../../../components/Heading";
import MUITable, {
  StyledTableCell,
  StyledTableRow,
} from "../../../components/MUITable";
import { useGetAllUsersQuery } from "../../../redux/api/userSlice";
import OverlayLoader from "../../../components/Spinner/OverlayLoader";
import { IoBookOutline } from "react-icons/io5";
import { maskingPhoneNumber } from "../../../utils";

const tableHead = ["Name", "Email", "Phone", "IsAdmin", "IsDoctor"];

const AdminUsers = () => {
  const { data, isLoading, isSuccess } = useGetAllUsersQuery({});

  return (
    <Card sx={{ p: 2 }}>
      {isLoading && <OverlayLoader />}

      <Heading sx={{ mb: 2 }}>All Users</Heading>

      <Box sx={{ boxShadow: "rgba(0, 0, 0, 0.16) 3px 16px 87px 0px" }}>
        <MUITable tableHead={tableHead}>
          {isSuccess && data?.data?.length > 0 ? (
            data?.data?.map((row: any) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>
                  {maskingPhoneNumber(row.phoneNumber)}
                </StyledTableCell>
                <StyledTableCell>{row.isAdmin ? "Yes" : "No"}</StyledTableCell>
                <StyledTableCell>{row.isDoctor ? "Yes" : "No"}</StyledTableCell>
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
                  {data?.data?.length === 0 ? "No users found" : ""}
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          )}
        </MUITable>
      </Box>
    </Card>
  );
};

export default AdminUsers;
