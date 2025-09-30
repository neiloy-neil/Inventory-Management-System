import { FieldTypes } from "../../../types/FieldTypes/FieldTypes";

const BRANCH_SELECTOR_FIELDS: FieldTypes[] = [
  {
    label: "Branch",
    name: "branch",
    placeholder: "Select Branch!",
    type: "select",
    options: [{ label: "Showing For All Branch", value: "" }],
  },
];

export default BRANCH_SELECTOR_FIELDS;
