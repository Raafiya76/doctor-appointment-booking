import { Navigate } from "react-router-dom";

const PublicRoutes = (props: any) => {
  const userData = localStorage.getItem("user");
  if (userData) {
    try {
      const user = JSON.parse(userData);
      const isAdmin = user?.data?.user?.isAdmin;
      // Redirect logged-in users based on their role
      return <Navigate to={isAdmin ? "/admin" : "/user-home"} />;
    } catch (error) {
      // If parsing fails, redirect to home
      return <Navigate to="/" />;
    }
  } else {
    return props.children;
  }
};

export default PublicRoutes;
