import { Navigate } from "react-router-dom";

const ProtectedRoutes = (props: any) => {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
