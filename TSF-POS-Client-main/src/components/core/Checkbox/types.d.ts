export interface CheckboxType {
  label: string;
  name: string;
  register: (rules?: RegisterOptions) => any; // Replace `RefReturn` with the appropriate type for the ref return value
}
