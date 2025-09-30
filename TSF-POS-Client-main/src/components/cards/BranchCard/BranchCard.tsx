import Card from "react-bootstrap/Card";
import Button from "../../core/Button/Button";
import { BranchCardTypes } from "./type";
import { useNavigate } from "react-router-dom";

const BranchCard = ({ branch }: BranchCardTypes) => {
  const navigate = useNavigate();

  const handleViewBranchClick = () => {
    navigate(`/branch/${branch._id}`);
  };

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title className="fs-5 fw-bold">{branch.name}</Card.Title>
        <Card.Text className="mb-2">{branch.address}</Card.Text>
        <Button title="Branch Details" onClick={handleViewBranchClick} />
      </Card.Body>
    </Card>
  );
};

export default BranchCard;
