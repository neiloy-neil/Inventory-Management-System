import Button from "../../components/core/Button/Button";
import { DeleteBranchValuationResponse } from "../../redux/actions/branchValuation/types";
import client from "../../client/axiosInstance";

const deleteBranchValuation = async (valuationId: string) => {
  try {
    const concent = window.confirm("Do You Want To Delete This Valuation?");
    if (!concent) return;

    const { data }: { data: DeleteBranchValuationResponse } =
      await client.delete(`/branch-valuation/action/${valuationId}`);

    if (data.success) {
      window.alert("Branch Valuation Deleted");
      window.location.reload();
    }
  } catch (error) {
    window.alert("Branch Valuation Deletion Failed");
  }
};
export const branchValuationColumns = [
  { field: "id", headerName: "Id", width: 90 },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    minWidth: 200,
  },
  {
    field: "branch",
    headerName: "Branch",
    flex: 1,
    minWidth: 250,
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "createdAt",
    headerName: "Added On",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "actions",
    headerName: "Actions",
    minWidth: 160,
    renderCell: (params: any) => {
      return (
        <div style={{ display: "flex", gap: 10 }}>
          <Button
            title={"Delete"}
            className="btn-danger"
            onClick={() => deleteBranchValuation(params.row._id)}
          />
        </div>
      );
    },
  },
];
