export interface BranchListSuccess {
  success: boolean;
  branches: Array<{
    _id: string;
    name: string;
    address: string;
  }>;
}
