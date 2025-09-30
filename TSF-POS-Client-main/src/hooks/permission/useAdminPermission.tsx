import { useSelector } from "react-redux";
import { StateType } from "../../redux/redux";

const useAdminPermission = () => {
  const { user } = useSelector((state: StateType) => state.user);
  const allowedRoles = ["admin"];

  return allowedRoles.includes(user.role);
};

export default useAdminPermission;
