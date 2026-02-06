// MUI Imports
import { Box, Tooltip } from "@mui/material";
// Custom Imports
import { Heading } from "../../components/Heading";
import Navbar from "../../components/Navbar";
import MUITable, {
  StyledTableCell,
  StyledTableRow,
} from "../../components/MUITable";
import OverlayLoader from "../../components/Spinner/OverlayLoader";
// Redux
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../redux/api/userSlice";
// Utils
import { formatDateTime } from "../../utils";
import CustomChip from "../../components/CustomChip";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import ToastAlert from "../../components/ToastAlert/ToastAlert";
import Spinner from "../../components/Spinner";

const tableHead = ["Name", "Email", "Date", "Roles", "Actions"];

const Users = () => {
  const [userId, setUserId] = useState("");
  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  const { data, isLoading, isSuccess } = useGetAllUsersQuery({});

  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const DeleteHandler = async (id: string) => {
    try {
      const user: any = await deleteUser({ userId: id });

      if (user?.data === null) {
        setToast({
          ...toast,
          message: "User Deleted Successfully",
          appearence: true,
          type: "success",
        });
      }
    } catch (error) {
      console.error("Deleting User Error:", error);
      setToast({
        ...toast,
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  return (
    <>
      {isLoading && <OverlayLoader />}
      <Navbar>
        <Heading>Users</Heading>
        <Box
          sx={{
            margin: "20px 0",
            boxShadow: "rgba(0, 0, 0, 0.16) 3px 16px 87px 0px",
          }}
        >
          <MUITable tableHead={tableHead}>
            {isSuccess &&
              data.data.map((row: any) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell>{row?.name}</StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>
                    {formatDateTime(row.createdAt)}
                  </StyledTableCell>
                  <StyledTableCell>
                    <CustomChip
                      label={
                        row?.isAdmin
                          ? "Owner"
                          : row?.isDoctor
                          ? "Doctor"
                          : "User"
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    {userId === row.id && deleteLoading ? (
                      <Spinner size={20} />
                    ) : (
                      <Tooltip title="Delete User" placement="bottom">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "3px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            DeleteHandler(row.id);
                            setUserId(row.id);
                          }}
                        >
                          {row?.isAdmin || row?.isDoctor ? (
                            ""
                          ) : (
                            <MdDeleteOutline style={{ fontSize: "17px" }} />
                          )}
                          {row?.isAdmin || row?.isDoctor ? "" : "Delete"}
                        </Box>
                      </Tooltip>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </MUITable>
        </Box>
      </Navbar>
      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </>
  );
};

export default Users;
