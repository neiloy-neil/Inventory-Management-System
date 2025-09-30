import Card from "react-bootstrap/Card";
import Button from "../../core/Button/Button";
import { useSelector } from "react-redux";
import { StateType } from "../../../redux/redux";
import "./userCard.scss";
import { UserCardTypes } from "../../../pages/Users/types";

const UserCard = ({
  user,
  setDeletingUserId,
  setDeletionModelOpen,
}: UserCardTypes) => {
  const { user: loggedInUser } = useSelector((state: StateType) => state.user);

  const onDeleteClick = () => {
    setDeletionModelOpen(true);
    setDeletingUserId(user._id);
  };
  return (
    <>
      <Card
        className="mw-100 user__card"
        style={{ minWidth: 250, maxWidth: "100%" }}
      >
        <Card.Body>
          <Card.Title className="font-weight-bold title ">
            {user.firstName} {user.lastName}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted role">
            {user.role.toUpperCase()}
          </Card.Subtitle>
          <Card.Text className="manage mb-1">Manages: {user.branch}</Card.Text>
          <Card.Text className="manage">Email: {user.email}</Card.Text>

          <div className="d-flex mt-3 gap-2">
            <Button
              title="Delete User"
              className="btn-danger w-100"
              onClick={onDeleteClick}
              disabled={user?._id === loggedInUser?._id}
            />
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default UserCard;
