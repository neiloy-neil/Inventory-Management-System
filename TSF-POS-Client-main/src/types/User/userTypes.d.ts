export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  __v: number;
  branch?: string;
}
