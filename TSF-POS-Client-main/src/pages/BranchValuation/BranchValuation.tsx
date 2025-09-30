import { useEffect, useState } from "react";
import Pagewrapper from "../../components/Pagewrapper/Pagewrapper";
import { useDispatch, useSelector } from "react-redux";
import { getBranchValuation } from "../../redux/actions/branchValuation/branchValuationAction";
import { StateType } from "../../redux/redux";
// import { branchValuationColumns } from "./branchValuationColumn";
// import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import BranchSelector from "../../components/sections/Branch/BranchSelector/BranchSelector";
import { getBranch } from "../../redux/actions/branch/branchAction";
import AlertPopup from "../../components/AlertPopup/AlertPopup";

const BranchValuation = () => {
  const { valuationList, totalAmount } = useSelector(
    (state: StateType) => state.branchValuation
  );
  const { branch } = useSelector((state: StateType) => state.branch);

  const [branchId, setBranchId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (branchId) dispatch(getBranchValuation(branchId));
    dispatch(getBranch(branchId));
  }, [dispatch, branchId]);

  const row: any = [];

  valuationList?.map((valuation, index) => {
    row.push({
      ...valuation,
      id: index + 1,
      branch: valuation.branch.name,
      createdAt: moment(valuation.createdAt).format("DD-MM-YYYY hh:mm a"),
    });
  });

  // calculating the amount of product the branch has currently
  let productValue = 0;

  branch?.products?.forEach((product) => {
    if (!product) productValue = 0;
    productValue += product.id?.costPrice * product.quantity;
  });

  return (
    <Pagewrapper>
      <BranchSelector setBranchId={setBranchId} />
      {!branchId ? (
        <AlertPopup message="Please Select a Branch"></AlertPopup>
      ) : (
        <>
          <h6 className="mt-4 font-weight-bold">
            Total Branch Value : {totalAmount + productValue}
          </h6>
          <h6 className="mt-4 font-weight-bold">
            Product Value : {productValue}
          </h6>
          <h6 className="mt-4 font-weight-bold">Others : {totalAmount}</h6>
          
        </>
      )}
    </Pagewrapper>
  );
};

export default BranchValuation;
