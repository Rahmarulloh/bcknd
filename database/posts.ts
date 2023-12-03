import { IBody, IEntity } from "../utils/types";

const posts: IEntity.IPost[] = [];

/** LIST ALL POSTS */
const getPosts = () => posts;

/** ADD POST */
const addPost = (post: IEntity.IPost) => {
  posts.push(post);
};

/** GET ONE POST */
const getPost = (id: string) => {
  return posts.find((post) => post.id === id);
};

/** UPDATE POST */
const updatePost = (id: string, post: IBody.IPost) => {
  const index = posts.findIndex((post) => post.id === id);
  posts[index].title = post.title;
  posts[index].content =
    post.content === undefined ? posts[index].content : post.content;
  posts[index].updatedAt = new Date();

  return posts[index];
};

/** DELETE POST */
const deletePost = (id: string) => {
  const index = posts.findIndex((post) => post.id === id);
  posts.splice(index, 1);

  return posts;
};

export { getPosts, addPost, getPost, deletePost, updatePost };
