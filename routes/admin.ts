import express from "express";
import { faker } from "@faker-js/faker";

import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../database/posts";
import {
  validateAdmin,
  validatePost,
  validateSinglePost,
} from "../middlewares/validate";
import { IBody, IEntity, IResponse } from "../utils/types";

const router = express.Router();

/** LIST ALL POSTS */
router.get("/:adminId/posts", (req, res) => {
  const adminValidation = validateAdmin(req);

  if (adminValidation) {
    return res.status(401).send(adminValidation);
  }

  const response: IResponse.ISuccess<IEntity.IPost[]> = {
    status: "success",
    data: getPosts(),
    message: "Posts fetched successfully",
  };

  res.send(response);
});

/** GET ONE POST */
router.get("/:adminId/post/:postId", (req, res) => {
  const adminValidation = validateAdmin(req);
  const validation: IResponse.IError = validatePost(req);

  if (adminValidation) {
    return res.status(401).send(adminValidation);
  }
  if (validation) {
    return res.status(400).send(validation);
  }

  const { postId } = req.params;

  const post = getPost(postId);

  if (!post) {
    return res.status(404).send({
      status: "error",
      message: "Post not found",
    });
  }

  const response: IResponse.ISuccess<IEntity.IPost> = {
    status: "success",
    data: post,
    message: "Post fetched successfully",
  };

  res.send(response);
});

/** ADD POST */
router.post("/:adminId/newPost", (req, res) => {
  const adminValidation = validateAdmin(req);
  const validation: IResponse.IError = validatePost(req);

  if (adminValidation) {
    return res.status(401).send(adminValidation);
  }
  if (validation) {
    return res.status(400).send(validation);
  }

  const { title, content } = req.body as IBody.IPost;

  const post: IEntity.IPost = {
    id: faker.string.uuid(),
    title,
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  addPost(post);

  const response: IResponse.ISuccess<IEntity.IPost> = {
    status: "success",
    data: post,
    message: "Post created successfully",
  };

  res.send(response);
});

/** UPDATE POST */
router.put("/:adminId/post/:postId", (req, res) => {
  const adminValidation = validateAdmin(req);
  const validation: IResponse.IError = validatePost(req);

  if (adminValidation) {
    return res.status(401).send(adminValidation);
  }
  if (validation) {
    return res.status(400).send(validation);
  }

  const { postId } = req.params;
  const { title, content } = req.body as IBody.IPost;

  const post = updatePost(postId, { title, content });

  if (!post) {
    return res.status(404).send({
      status: "error",
      message: "Unable to update post",
    });
  }

  const response: IResponse.ISuccess<IEntity.IPost> = {
    status: "success",
    data: post,
    message: "Post updated successfully",
  };

  res.send(response);
});

/** DELETE POST */
router.delete("/:adminId/post/:postId", (req, res) => {
  const adminValidation: IResponse.IError = validateAdmin(req);
  const validation: IResponse.IError = validateSinglePost(req);

  if (adminValidation) {
    return res.status(401).send(adminValidation);
  }
  if (validation) {
    return res.status(400).send(validation);
  }

  const { postId } = req.params;

  const post = deletePost(postId);

  if (!post) {
    return res.status(404).send({
      status: "error",
      message: "Unable to delete post",
    });
  }

  const response: IResponse.ISuccess<IEntity.IPost[]> = {
    status: "success",
    data: post,
    message: "Post deleted successfully",
  };

  res.send(response);
});

export default router;
