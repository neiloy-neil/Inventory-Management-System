export interface BranchValuation {
  _id: string;
  name: string;
  branch: {
    _id: string;
    name: string;
  };
  amount: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetBranchValuationsResponse {
  success: boolean;
  data: BranchValuation[];
  totalAmount: number;
}

export interface DeleteBranchValuationResponse {
  success: boolean;
  message: string;
}
