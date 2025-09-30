import { User } from "../../../../types/User/userTypes";

export interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
}
