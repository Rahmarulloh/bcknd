import { IBody, IEntity } from "../utils/types";

const posts: IEntity.IPost[] = [];

/** LIST ALL POSTS */
const getPosts = () => posts;

/** GET ONE POST */
const getPost = (id: string) => posts.find((post) => post.id === id);

/** ADD POST */
const addPost = (post: IEntity.IPost) => posts.push(post);

/** UPDATE POST */
const updatePost = (id: string, post: IBody.IPost) => {
  const idx = posts.findIndex((post) => post.id === id);
  posts[idx].title = post.title;
  posts[idx].content =
    post.content === undefined ? posts[idx].content : post.content;
  posts[idx].updatedAt = new Date();

  return posts[idx];
};

/** DELETE POST */
const deletePost = (id: string) => {
  const index = posts.findIndex((post) => post.id === id);
  posts.splice(index, 1);

  return posts;
};

export { getPosts, addPost, getPost, deletePost, updatePost };
