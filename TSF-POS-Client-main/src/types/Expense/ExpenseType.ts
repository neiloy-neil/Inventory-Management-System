export type Expense = {
  _id: string;
  type: "salary" | "food" | "other" | "shipping";
  amount: number;
  employeeName?: string;
  branch: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
