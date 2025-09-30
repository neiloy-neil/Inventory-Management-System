import Card from "react-bootstrap/Card";
import { User } from "../../../types/User/userTypes";
import AppModal from "../../Modals/AppModal/AppModal";
import Button from "../../core/Button/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StateType } from "../../../redux/redux";
import { deleteModeratorFromBranch } from "../../../redux/actions/branch/moderatorAction";

const ModeratorCard = ({
  moderator,
  branchId,
}: {
  moderator: User;
  branchId: string;
}) => {
  const { loading } = useSelector((state: StateType) => state.user);
  const [deletionModelOpen, setDeletionModelOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const handleDeleteUserFromBranch = () => {
    dispatch(deleteModeratorFromBranch(moderator?._id, branchId));
    setDeletionModelOpen(false);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <AppModal
        handleConfirm={handleDeleteUserFromBranch}
        title="Confirm User Deletion From Branch"
        loading={loading}
        open={deletionModelOpen}
        setOpen={setDeletionModelOpen}
        description="Do You Want To Delete This User From Branch?"
      />
      <Card.Body>
        <Card.Title className="fs-5 fw-bold text-secondary">
          {moderator?.firstName} {moderator?.lastName}
        </Card.Title>
        <Card.Text style={{ fontSize: 14 }}>{moderator?.email}</Card.Text>
        <Button
          title="Delete Moderator "
          className="mt-3 btn-danger"
          onClick={() => setDeletionModelOpen(true)}
        />
      </Card.Body>
    </Card>
  );
};

export default ModeratorCard;
