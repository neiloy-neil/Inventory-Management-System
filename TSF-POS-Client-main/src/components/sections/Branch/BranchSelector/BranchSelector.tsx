import BRANCH_SELECTOR_FIELDS from "../../../../constants/selectors/branch/branchSelector";
import { BranchSelectorProps } from "./types";
import { Form } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../../../redux/redux";
import { getBranchList } from "../../../../redux/actions/branches/branchesAction";

const BranchSelector = ({
  setBranchId,
  style,
  fullWidth,
  errorMessage,
  disableAllBranch,
}: BranchSelectorProps) => {
  const { branches } = useSelector((state: StateType) => state.branches);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBranchList());
  }, [dispatch]);

  useEffect(() => {
    if (branches) {
      const branchField = BRANCH_SELECTOR_FIELDS.find(
        (field) => field.name === "branch"
      );

      if (branchField) {
        branches.forEach((branch) => {
          const option = { label: branch.name, value: branch._id };
          if (!branchField.options?.some((o) => o.value === option.value)) {
            branchField.options?.push(option);
          }
        });
      }
    }
  }, [branches, disableAllBranch]);

  return (
    <div style={{ maxWidth: fullWidth ? "100%" : 300, width: "100%" }}>
      {BRANCH_SELECTOR_FIELDS.map((field, index) => {
        return (
          <div>
            <Form.Select
              id=""
              onChange={(e) => setBranchId(e.target.value)}
              key={index}
              style={style}
            >
              {field.options?.map((option, index) => {
                if (disableAllBranch && index === 0) return;
                return (
                  <option value={option.value} key={index}>
                    {option.label}
                  </option>
                );
              })}
            </Form.Select>

            {errorMessage && (
              <small
                className="mt-3"
                style={{ marginTop: "10px", color: "red" }}
              >
                {errorMessage}
              </small>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BranchSelector;
