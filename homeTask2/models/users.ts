import { v4 as uuid } from "uuid";

export type IUser = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};

/******helpers************/
export function hidePassword(user: IUser) {
  let filteredUser: Partial<IUser> = { ...user };
  delete filteredUser.password;
  return filteredUser;
}

export const getAutoSuggestUsers = (
  loginSubstring: string,
  limitInput: number,
  users: Array<IUser>
): Array<IUser> => {
  const regex = RegExp(loginSubstring.toLowerCase());
  const countOfUsers = users.length;
  let resultUsers: Array<IUser> = [];
  let limit = limitInput;

  if (limitInput === 0) {
    return resultUsers;
  }
  if (limitInput > countOfUsers) {
    limit = countOfUsers;
  }

  if (!!users.length && limit) {
    resultUsers = users;
    resultUsers.sort(compareLogins);
    resultUsers = resultUsers.filter((user) =>
      regex.test(user.login.toLowerCase())
    );
    resultUsers = resultUsers.slice(0, limit);
  }
  return resultUsers;
};

const compareLogins = (firstItem: IUser, secondItem: IUser) => {
  if (firstItem.login.toLowerCase() < secondItem.login.toLowerCase()) {
    return -1;
  }
  if (firstItem.login.toLowerCase() > secondItem.login.toLowerCase()) {
    return 1;
  }
  return 0;
};

export const updateUser = (details: Partial<IUser>, user: IUser): IUser => {
  return {
    ...user,
    ...details,
  };
};

export const createUser = (details: IUser): IUser => {
  return {
    ...details,
    id: details.id || uuid(),
    isDeleted: false,
  };
};
