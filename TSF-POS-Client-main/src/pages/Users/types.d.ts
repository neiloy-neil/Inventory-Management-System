import React, { SetStateAction } from "react";
import { User } from "../../types/User/userTypes";

export interface UserCardTypes {
  setDeletingUserId: React.Dispatch<SetStateAction<string>>;
  setDeletionModelOpen: React.Dispatch<SetStateAction<boolean>>;
  user: User;
}
