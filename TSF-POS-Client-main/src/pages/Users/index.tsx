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
import "./users.scss";

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
    <Pagewrapper title="User Management">
      <div className="users-page">
        <div className="users-header modern-flex modern-flex-between modern-mb-lg">
          <h1 className="users-title modern-dashboard-title">User Management</h1>
          <Adduser />
        </div>
        
        <AppModal
          loading={deletionLoading}
          open={deletionModelOpen}
          setOpen={setDeletionModelOpen}
          handleConfirm={handleDeleteUser}
          title="Confirm Deletion"
          description="Do you want to delete this user"
        />
        
        {loading ? (
          <div className="users-grid modern-grid modern-grid-cols-1 sm:modern-grid-cols-2 lg:modern-grid-cols-3 modern-gap-lg">
            {[...Array(6)].map((_, index) => (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                key={index}
                className="modern-card"
              />
            ))}
          </div>
        ) : (
          <div className="users-grid modern-grid modern-grid-cols-1 sm:modern-grid-cols-2 lg:modern-grid-cols-3 modern-gap-lg">
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
        
        {users.length === 0 && !loading && (
          <div className="no-users modern-text-center modern-py-3xl">
            <h3>No users found</h3>
            <p className="modern-text-base modern-text-gray-600 modern-mb-lg">
              Get started by adding your first user
            </p>
          </div>
        )}
      </div>
    </Pagewrapper>
  );
};

export default Users;