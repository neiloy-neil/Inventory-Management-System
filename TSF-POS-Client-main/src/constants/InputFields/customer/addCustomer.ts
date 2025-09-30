import { FieldTypes } from "../../../types/FieldTypes/FieldTypes";

const ADD_CUSTOMER_FIELDS: FieldTypes[] = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter first name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter last name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email address",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "text",
    placeholder: "Enter phone number",
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter street address",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "Enter city",
  },
  {
    name: "state",
    label: "State",
    type: "text",
    placeholder: "Enter state",
  },
  {
    name: "zipCode",
    label: "Zip Code",
    type: "text",
    placeholder: "Enter zip code",
  },
  {
    name: "country",
    label: "Country",
    type: "text",
    placeholder: "Enter country",
  },
  {
    name: "marketingConsent",
    label: "Marketing Consent",
    type: "checkbox",
    placeholder: "",
  },
];

export default ADD_CUSTOMER_FIELDS;