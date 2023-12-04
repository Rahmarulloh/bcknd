# BLOG APP

## Admin User Endpoints

| Routes                 | HTTP Verb  | Post Body   | Description     | Task |
| ---------------------- | ---------- | ----------- | --------------- | ---- |
| `/admin/posts`         | **GET**    | -           | List All Posts  | ✅   |
| `/admin/newPost`       | **POST**   | Post data\* | New Post        | ✅   |
| `/admin/posts/:postId` | **GET**    | -           | Get Single Post | ✅   |
| `/admin/posts/:postId` | **PUT**    | Post data\* | Edit Post       | ✅   |
| `/admin/posts/:postId` | **DELETE** | -           | Delete Post     | ✅   |

## Simple User Endpoints

| Routes                     | HTTP Verb  | Post Body                   | Description          | Task |
| -------------------------- | ---------- | --------------------------- | -------------------- | ---- |
| `/user/register`           | **POST**   | User register credentials\* | Simple User Register | ✅   |
| `/user/login`              | **POST**   | User credentials\*          | Simple User Login    | ✅   |
| `/user/logout/:userId`     | **DELETE** | -                           | Simple User Logout   | ✅   |
| `/user/posts`              | **GET**    | -                           | List All Posts       | ✅   |
| `/user/posts/:postId`      | **GET**    | -                           | Get Single Post      | ✅   |
| `/user/comment/:postId`    | **POST**   | Comment data\*              | Add Comment          | ◻️   |
| `/user/comment/:commentId` | **PUT**    | Comment data\*              | Edit Comment         | ◻️   |
| `/user/comment/:commentId` | **DELETE** | -                           | Delete Comment       | ◻️   |

## Notes for \*

- User register credentials: `{ "name": "name", "email": "email", "password": "password", "role": "admin | user" }`
- User credentials: `{ "email": "email", "password": "password" }`
- Post data: `{ "title": "title", "content": "content" }`
- Comment data: `{ "content": "content" }`

## Database Schema

### Users Table ✅

| Field Name | Field Type | Description                  |
| ---------- | ---------- | ---------------------------- |
| id(`PK`)   | int        | User ID(`PK`)                |
| name       | varchar    | User Name                    |
| email      | varchar    | User Email                   |
| password   | varchar    | User Password                |
| role       | varchar    | User Role(`admin` or `user`) |
| created_at | timestamp  | Created At                   |
| updated_at | timestamp  | Updated At                   |

### Posts Table ✅

| Field Name | Field Type | Description   |
| ---------- | ---------- | ------------- |
| id(`PK`)   | int        | Post ID(`PK`) |
| title      | varchar    | Post Title    |
| content    | varchar    | Post Content  |
| created_at | timestamp  | Created At    |
| updated_at | timestamp  | Updated At    |

### Comments Table ✅

| Field Name    | Field Type | Description      |
| ------------- | ---------- | ---------------- |
| id(`PK`)      | int        | Comment ID(`PK`) |
| post_id(`FK`) | int        | Post ID(`FK`)    |
| user_id(`FK`) | int        | User ID(`FK`)    |
| content       | varchar    | Comment          |
| created_at    | timestamp  | Created At       |
| updated_at    | timestamp  | Updated At       |

## Notes

- Each user has a unique ID (`users.id`).
- Posts are associated with a user through the `user_id` field in the `posts` table.
- Comments are associated with a user (`user_id`) and a post (`post_id`).
- Timestamp fields (`created_at` and `updated_at`) track the creation and modification times for records.
