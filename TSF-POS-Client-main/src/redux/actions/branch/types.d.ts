import { Branch } from "../../../types/Branch/branchTypes";

export interface BranchResponse {
  success: boolean;
  branch: Branch;
}

export interface BranchEditResponse {
  success: boolean;
  message: string;
}

export interface BranchAddResponse {
  success: boolean;
  message: string;
}

export interface DeleteModeratorResponse {
  success: boolean;
  message: string;
}
