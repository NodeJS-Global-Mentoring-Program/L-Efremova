export interface IUser {
  id: string | number;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

type Permission = "READ" | "WHRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";

export interface IGroup {
  id: string | number;
  name: string;
  permissions: Array<Permission>;
}
