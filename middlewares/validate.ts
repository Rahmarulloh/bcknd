import express from "express";

import { admin } from "../database";
import { IBody, IResponse } from "../utils/types";

function validateRegister(req: express.Request): IResponse.IError | null {
  const { name, email, password, role } = req.body as IBody.IRegister;

  if (role === "admin" && admin.email) {
    return {
      status: "error",
      message: "Admin is already exist.",
    };
  }

  if (!name || !email || !password || !role) {
    return {
      status: "error",
      message: "All fields are required",
    };
  } else if (password.length < 6) {
    return {
      status: "error",
      message: "Password must be at least 6 characters",
    };
  } else if (!["admin", "user"].includes(role)) {
    return {
      status: "error",
      message: "Invalid role",
    };
  } else if (!email.includes("@")) {
    return {
      status: "error",
      message: "Invalid email",
    };
  } else if (email.length < 6) {
    return {
      status: "error",
      message: "Email must be at least 6 characters",
    };
  } else if (password.length < 6) {
    return {
      status: "error",
      message: "Password must be at least 6 characters",
    };
  }

  return null;
}

function validateLogin(req: express.Request): IResponse.IError | null {
  const { email, password } = req.body as IBody.ILogin;

  if (!email || !password) {
    return {
      status: "error",
      message: "All fields are required",
    };
  } else if (password.length < 6) {
    return {
      status: "error",
      message: "Password must be at least 6 characters",
    };
  } else if (!email.includes("@")) {
    return {
      status: "error",
      message: "Invalid email",
    };
  } else if (email.length < 6) {
    return {
      status: "error",
      message: "Email must be at least 6 characters",
    };
  }

  return null;
}

function validateAdmin(req: express.Request): IResponse.IError | null {
  const { adminId } = req.params;

  if (adminId !== admin.id) {
    return {
      status: "error",
      message: "Unauthorized access! 👮‍♂️",
    };
  }

  return null;
}

function validatePost(req: express.Request): IResponse.IError | null {
  const { title, content } = req.body as IBody.IPost;

  if (!title && !content) {
    return {
      status: "error",
      message: "All fields are required",
    };
  }

  return null;
}

function validateSinglePost(req: express.Request): IResponse.IError | null {
  const { postId } = req.params;

  if (!postId) {
    return {
      status: "error",
      message: "Post ID is required",
    };
  }

  return null;
}

export {
  validateLogin,
  validateRegister,
  validatePost,
  validateSinglePost,
  validateAdmin,
};
