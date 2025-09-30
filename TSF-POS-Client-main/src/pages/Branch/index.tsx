import { useParams } from "react-router-dom";
import Pagewrapper from "../../components/Pagewrapper/Pagewrapper";
import BranchModerators from "../../components/sections/Branch/BranchModerators/BranchModerators";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBranch } from "../../redux/actions/branch/branchAction";
import { StateType } from "../../redux/redux";
import BigSpaceLoader from "../../components/loader/BigSpaceLoder/BigSpaceLoader";
import AlertPopup from "../../components/AlertPopup/AlertPopup";
import { CLEAR_ERROR } from "../../constants/reduxActionsNames/user";
import BranchHeader from "../../components/sections/Branch/BranchHeader/BranchHeader";
import BranchProducts from "../../components/sections/Branch/BranchProducts/BranchProducts";
import useAdminPermission from "../../hooks/permission/useAdminPermission";
const Branch = () => {
  const isAdmin = useAdminPermission();
  const { branch, error, loading } = useSelector(
    (state: StateType) => state.branch
  );
  const { message } = useSelector((state: StateType) => state.user);
  const { message: productMessage } = useSelector(
    (state: StateType) => state.product
  );
  const { success } = useSelector((state: StateType) => state.promise);

  const { id = "" } = useParams<string>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: CLEAR_ERROR });
    dispatch(getBranch(id));
  }, [dispatch, id, success, message, productMessage]);

  if (error) {
    return (
      <Pagewrapper>
        <AlertPopup message={error} />
      </Pagewrapper>
    );
  }

  return (
    <Pagewrapper>
      {loading || !branch ? (
        <BigSpaceLoader height={500} />
      ) : (
        <div>
          <BranchHeader branch={branch} />
          {isAdmin && (
            <BranchModerators
              moderators={branch?.moderators}
              branchId={branch?._id}
            />
          )}
          <BranchProducts products={branch?.products} branchId={id} />
        </div>
      )}
    </Pagewrapper>
  );
};

export default Branch;
