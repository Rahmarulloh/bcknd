import { IEntity } from "../utils/types";

const admin: IEntity.IAdmin = {
  id: "",
  name: "",
  email: "",
  password: "",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const users: IEntity.IUser[] = [];

const addUser = (user: IEntity.IUser) => {
  users.push(user);
};

export { admin, users, addUser };
