/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import Appointments from "./views/Appointments";
import ApplyDoctor from "./views/ApplyDoctor";
import Profile from "./views/Profile";
import Doctors from "./views/Doctors";
import Users from "./views/Users";
import Notifications from "./views/Notifications";
import Landing from "./views/Landing";
import { useVerifyUserQuery } from "./redux/api/userSlice";
import { useDispatch } from "react-redux";
import { selectedUserId, setUser } from "./redux/auth/authSlice";
import OverlayLoader from "./components/Spinner/OverlayLoader";
import BookAppointment from "./views/Appointments/components/BookAppointment";
import DoctorAppointment from "./views/Appointments/components/DoctorAppointment";
import useTypedSelector from "./hooks/useTypedSelector";
import AdminDashboard from "./views/AdminDashboard";
import UserHome from "./views/UserHome";

function App() {
  const dispatch = useDispatch();
  const userId = useTypedSelector(selectedUserId);

  const { data, isLoading, isSuccess } = useVerifyUserQuery(
    { userId },
    { skip: !userId }, // Only call this query if userId exists
  );

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return; // Skip if no user data

    const user = JSON.parse(userData);
    if (isSuccess && data) {
      const updatedUser = {
        ...user,
        data: {
          ...user.data,
          user: {
            ...user.data.user,
            seenNotifications: data.data.seenNotifications,
            unseenNotifications: data.data.unseenNotifications,
          },
        },
      };
      dispatch(setUser(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  }, [data]);

  return (
    <>
      {isLoading && userId && <OverlayLoader />}
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoutes>
                <Signup />
              </PublicRoutes>
            }
          />
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoutes>
                <AdminDashboard />
              </ProtectedRoutes>
            }
          />
          {/* User Routes */}
          <Route
            path="/user-home"
            element={
              <ProtectedRoutes>
                <UserHome />
              </ProtectedRoutes>
            }
          />
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoutes>
                <Appointments />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/doctors/appointments"
            element={
              <ProtectedRoutes>
                <DoctorAppointment />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/book-appointments/:userId"
            element={
              <ProtectedRoutes>
                <BookAppointment />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoutes>
                <ApplyDoctor />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/doctors"
            element={
              <ProtectedRoutes>
                <Doctors />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoutes>
                <Users />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoutes>
                <Notifications />
              </ProtectedRoutes>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
