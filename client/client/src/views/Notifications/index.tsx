// React Imports
import React from "react";
import { useDispatch } from "react-redux";
// MUI Imports
import { Box, Tabs, Tab, Typography, Button } from "@mui/material";
// React Icons
import { MdMarkChatUnread } from "react-icons/md";
import { MdMarkChatRead } from "react-icons/md";
// Hooks
import useTypedSelector from "../../hooks/useTypedSelector";
// Redux
import {
  selectedUserNotifications,
  selectedUserReadNotifications,
  setUser,
} from "../../redux/auth/authSlice";
import {
  useDeleteNotificationsMutation,
  useSeenNotificationsMutation,
} from "../../redux/api/notificationApiSlice";
// Utils
import { processNotification } from "../../utils";
// Custom Imports
import Navbar from "../../components/Navbar";
import { Heading } from "../../components/Heading";
import ToastAlert from "../../components/ToastAlert/ToastAlert";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: "24px 0" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Notifications = () => {
  const dispatch = useDispatch();
  const userNotifications = useTypedSelector(selectedUserNotifications);
  const readNotifications = useTypedSelector(selectedUserReadNotifications);

  const [value, setValue] = React.useState(0);
  const [toast, setToast] = React.useState({
    message: "",
    appearence: false,
    type: "",
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  const [deleteNotifications, { isLoading: deleteNotiLoading }] =
    useDeleteNotificationsMutation();

  const deleteNotificationsHandler = async () => {
    try {
      const userData = localStorage.getItem("user");
      const user = JSON.parse(userData!);
      const response: any = await deleteNotifications({});
      if (response.data.status) {
        setToast({
          ...toast,
          message: "All Notifications are deleted",
          appearence: true,
          type: "success",
        });

        const updatedUser = {
          ...user,
          data: {
            ...user.data,
            user: {
              ...user.data.user,
              seenNotifications: response.data.data.seenNotifications,
              unseenNotifications: response.data.data.unseenNotifications,
            },
          },
        };
        dispatch(setUser(updatedUser));
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      if (response?.error) {
        setToast({
          ...toast,
          message: user?.error?.data?.message,
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Deleting Notification Error:", error);
      setToast({
        ...toast,
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  const [seenNotification, { isLoading }] = useSeenNotificationsMutation();

  const readNotificationHandler = async () => {
    try {
      const userData = localStorage.getItem("user");
      const user = JSON.parse(userData!);
      const response: any = await seenNotification({});

      if (response.data.status) {
        setToast({
          ...toast,
          message: "Marked all as read",
          appearence: true,
          type: "success",
        });

        const updatedUser = {
          ...user,
          data: {
            ...user.data,
            user: {
              ...user.data.user,
              seenNotifications: response.data.data.seenNotifications,
              unseenNotifications: response.data.data.unseenNotifications,
            },
          },
        };
        dispatch(setUser(updatedUser));
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
      if (response?.error) {
        setToast({
          ...toast,
          message: user?.error?.data?.message,
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Notifications Seen Error:", error);
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
      <Navbar>
        <Heading>Notifications</Heading>
        <Box
          sx={{
            margin: "20px 0",
            background: "#fff",
            borderRadius: "6px",
            padding: "10px 20px",
            boxShadow: "rgba(0, 0, 0, 0.16) 3px 16px 87px 0px",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  label="Unseen"
                  sx={{ textTransform: "capitalize", fontSize: "16px" }}
                  {...a11yProps(0)}
                  icon={<MdMarkChatUnread />}
                  iconPosition="start"
                />
                <Tab
                  label="Seen"
                  sx={{ textTransform: "capitalize", fontSize: "16px" }}
                  {...a11yProps(1)}
                  icon={<MdMarkChatRead />}
                  iconPosition="start"
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              {userNotifications?.length > 0 && (
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    onClick={readNotificationHandler}
                    disabled={isLoading}
                  >
                    Mark all as read
                  </Button>
                </Box>
              )}
              {userNotifications?.map((notification: any) => {
                return (
                  <>
                    <Box
                      sx={{
                        border: "1px solid #E5EAF2",
                        padding: "14px 24px",
                        borderRadius: "12px",
                        marginBottom: "20px",
                      }}
                      key={notification?.data?.doctorId}
                    >
                      <Box
                        sx={{ display: "flex", gap: 2, marginBottom: "5px" }}
                      >
                        <Box sx={{ minWidth: "100px" }}>Name:</Box>
                        <Box>{notification?.data?.name}</Box>
                      </Box>
                      <Box
                        sx={{ display: "flex", gap: 2, marginBottom: "5px" }}
                      >
                        <Box sx={{ minWidth: "100px" }}>Title:</Box>
                        <Box>{processNotification(notification?.type)}</Box>
                      </Box>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Box sx={{ minWidth: "100px" }}>Message:</Box>
                        <Box>{notification?.message}</Box>
                      </Box>
                    </Box>
                  </>
                );
              })}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              {readNotifications?.length > 0 && (
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    disabled={deleteNotiLoading}
                    onClick={deleteNotificationsHandler}
                    color="error"
                  >
                    Delete All
                  </Button>
                </Box>
              )}

              {readNotifications?.map((notification: any) => {
                return (
                  <>
                    <Box
                      sx={{
                        border: "1px solid #E5EAF2",
                        padding: "14px 24px",
                        borderRadius: "12px",
                        marginBottom: "20px",
                      }}
                      key={notification?.data?.doctorId}
                    >
                      <Box
                        sx={{ display: "flex", gap: 2, marginBottom: "5px" }}
                      >
                        <Box sx={{ minWidth: "100px" }}>Name:</Box>
                        <Box>{notification?.data?.name}</Box>
                      </Box>
                      <Box
                        sx={{ display: "flex", gap: 2, marginBottom: "5px" }}
                      >
                        <Box sx={{ minWidth: "100px" }}>Title:</Box>
                        <Box>{processNotification(notification.type)}</Box>
                      </Box>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Box sx={{ minWidth: "100px" }}>Message:</Box>
                        <Box>{notification?.message}</Box>
                      </Box>
                    </Box>
                  </>
                );
              })}
            </CustomTabPanel>
          </Box>
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

export default Notifications;
