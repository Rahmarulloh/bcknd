import { faker } from "@faker-js/faker";
import { IBody, IEntity } from "../utils/types";
import { admin } from ".";

const comments: IEntity.IComment[] = [];

const addComment = (
  postId: IEntity.IPost["id"],
  userId: IEntity.IUser["id"],
  content: IBody.IComment["content"]
): IEntity.IComment => {
  const comment: IEntity.IComment = {
    id: faker.string.uuid(),
    postId,
    userId,
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  comments.push(comment);
  return comment;
};

const getComment = (commentId: IEntity.IComment["id"]) =>
  comments.find((comment) => comment.id === commentId);

const getComments = (postId: IEntity.IPost["id"]) =>
  comments.filter((comment) => comment.postId === postId);

const deleteComment = (userId: IEntity.IUser["id"], commentId: string) => {
  if (
    (getComment(commentId) && getComment(commentId).userId === userId) ||
    userId === admin.id
  ) {
    const idx = comments.findIndex((comment) => comment.id === commentId);
    comments.splice(idx, 1);
    return getComment(commentId);
  }
  return getComment(commentId);
};

const updateComment = (
  userId: IEntity.IUser["id"],
  commentId: IEntity.IComment["id"],
  content: IBody.IComment["content"]
) => {
  const comment = getComment(commentId);
  if (comment.userId === userId) {
    comment.content = content;
    comment.updatedAt = new Date();
    return comment;
  }
  return null;
};

export {
  comments,
  addComment,
  getComment,
  getComments,
  deleteComment,
  updateComment,
};
