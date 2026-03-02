import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = (props: any) => {
  const userData = localStorage.getItem("user");
  const location = useLocation();

  if (!userData) {
    return <Navigate to="/login" />;
  }

  try {
    const user = JSON.parse(userData);
    const isAdmin = user?.data?.user?.isAdmin;

    // Check if user has the correct role to access the route
    if (location.pathname === "/admin" && !isAdmin) {
      return <Navigate to="/userhome" />;
    }
    if (location.pathname.startsWith("/userhome") && isAdmin) {
      return <Navigate to="/admin" />;
    }

    return props.children;
  } catch (error) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
