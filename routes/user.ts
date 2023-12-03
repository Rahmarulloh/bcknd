import express from "express";
import { faker } from "@faker-js/faker";

import { addUser, admin, users } from "../database/index";
import { IBody, IEntity, IResponse } from "../utils/types";
import { validateLogin, validateRegister } from "../middlewares/validate";

const router = express.Router();

/** USER REGISTER */
router.post("/register", (req, res) => {
  const { name, email, password, role } = req.body as IBody.IRegister;
  const responseError: IResponse.IError = {
    status: "error",
    message: "User registration failed",
  };

  const validation: IResponse.IError = validateRegister(req);

  if (validation) {
    return res.status(400).send(validation);
  }

  const user: IEntity.IUser = {
    id: faker.string.uuid(),
    name,
    email,
    password,
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const responseSuccess: IResponse.ISuccess<IEntity.IUser> = {
    status: "success",
    data: user,
    message: `User ${user.role === "admin" ? "admin" : ""} created ${
      user.name
    } successfully`,
  };

  if (responseSuccess.data.role !== "admin") {
    addUser(user);
  } else {
    admin.id = user.id;
    admin.name = user.name;
    admin.email = user.email;
    admin.password = user.password;
    admin.role = user.role;
    admin.createdAt = user.createdAt;
    admin.updatedAt = user.updatedAt;
  }

  return res.status(200).send(responseSuccess);
});

/** USER LOGIN */
router.post("/login", (req, res) => {
  const { email, password } = req.body as IBody.ILogin;
  const responseError: IResponse.IError = {
    status: "error",
    message: `User does not exist with ${email}`,
  };

  const validation: IResponse.IError = validateLogin(req);

  if (validation) {
    return res.status(400).send(validation);
  }

  if (email === admin.email && password === admin.password) {
    const responseSuccess: IResponse.ISuccess<IEntity.IUser> = {
      status: "success",
      data: admin,
      message: "User admin logged in successfully",
    };
    return res.status(200).send(responseSuccess);
  }

  const userExists = users.find(
    (user) => user.email === email && user.password === password
  );

  if (userExists) {
    const responseSuccess: IResponse.ISuccess<IEntity.IUser> = {
      status: "success",
      data: userExists,
      message: `User logged in successfully`,
    };
    return res.status(200).send(responseSuccess);
  }

  res.status(400).send(responseError);
});

/** USER LOGOUT */
router.delete("/logout/:userId", (req, res) => {
  const { userId } = req.params;
  const responseError: IResponse.IError = {
    status: "error",
    message: `User does not exist with ID ${userId}`,
  };

  if (userId === admin.id) {
    admin.id = "";
    admin.name = "";
    admin.email = "";
    admin.password = "";
    admin.role = "admin";
    admin.createdAt = new Date();
    admin.updatedAt = new Date();

    const responseSuccess: IResponse.ISuccess<IEntity.IUser> = {
      status: "success",
      data: admin,
      message: "User admin logged out successfully",
    };

    return res.status(200).send(responseSuccess);
  }

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(400).send(responseError);
  }

  const user = users[userIndex];

  users.splice(userIndex, 1);

  const responseSuccess: IResponse.ISuccess<IEntity.IUser> = {
    status: "success",
    data: user,
    message: "User logged out successfully",
  };

  return res.status(200).send(responseSuccess);
});

export default router;
