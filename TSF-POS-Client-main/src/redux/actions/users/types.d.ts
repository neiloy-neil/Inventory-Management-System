import { User } from "../../../types/User/userTypes";

export interface FetchUsersSuccess {
  success: boolean;
  users: User[];
}
