import { useEffect, useState } from "react";
import Pagewrapper from "../../components/Pagewrapper/Pagewrapper";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/actions/users/usersAction";
import { AppDispatch, StateType } from "../../redux/redux";
import UserCard from "../../components/cards/UserCard/UserCard";
import { Skeleton } from "@mui/material";
import AppModal from "../../components/Modals/AppModal/AppModal";
import { deleteUser } from "../../redux/actions/user/userAction";
import { toast } from "react-hot-toast";
import Adduser from "../../components/Adduser/Adduser";
// import UserCard from "../../components/cards/UserCard/UserCard";

const Users = () => {
  const { users, loading } = useSelector((state: StateType) => state.users);
  const {
    loading: deletionLoading,
    message,
    error,
  } = useSelector((state: StateType) => state.promise);
  const [deleteingUserId, setDeletingUserId] = useState<string>("");
  const [deletionModelOpen, setDeletionModelOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    if (message) toast.success(message);
    if (error) toast.error(error);
  }, [dispatch, message, error]);

  const handleDeleteUser = async () => {
    await dispatch(deleteUser(deleteingUserId));
    setDeletionModelOpen(false);
  };

  return (
    <Pagewrapper>
      <Adduser />
      <AppModal
        loading={deletionLoading}
        open={deletionModelOpen}
        setOpen={setDeletionModelOpen}
        handleConfirm={handleDeleteUser}
        title="Confirm Deletion"
        description="Do you want to delete this user"
      />
      {loading ? (
        <div className="users__list d-flex gap-4 flex-wrap">
          {[...Array(4)].map((_, index) => (
            <Skeleton
              variant="rectangular"
              width={250}
              height={150}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div className="users__list d-flex gap-4 flex-wrap">
          {users?.map((user, index) => {
            return (
              <UserCard
                setDeletionModelOpen={setDeletionModelOpen}
                setDeletingUserId={setDeletingUserId}
                key={index}
                user={user}
              />
            );
          })}
        </div>
      )}
    </Pagewrapper>
  );
};

export default Users;
