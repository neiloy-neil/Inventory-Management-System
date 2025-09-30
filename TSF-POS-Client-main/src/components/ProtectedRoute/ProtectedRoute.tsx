import { Navigate } from "react-router-dom";
import { ProtectedRouteTypes } from "./types";
import { useSelector } from "react-redux";
import { StateType } from "../../redux/redux";

function ProtectedRoute({ children }: ProtectedRouteTypes) {
  const { loggedIn } = useSelector((state: StateType) => state.user);
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
export default ProtectedRoute;
