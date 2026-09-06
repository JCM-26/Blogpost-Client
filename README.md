# Longhand — a small blog client

A small Vue 3 (Vite) client for the [blogpostAPI](https://github.com/JCM-26/blogpostAPI) REST API.
Register, log in, read all posts, and write/edit/delete your own — with
[Notyf](https://github.com/caroso1222/notyf) toast notifications for every action and error.

Structured the same way as the author's [fitnessAPI-Client](https://github.com/JCM-26/fitnessAPI-Client).

## Stack

- Vue 3 (`<script setup>`, Composition API)
- Vue Router 4 (route guard redirects to `/login` when there's no token)
- Axios (with a request interceptor that attaches `Authorization: Bearer <token>`)
- Notyf (success/error toasts)
- Plain CSS, no UI framework

## ⚠️ A note on the API endpoints

blogpostAPI's `routes/` and `controllers/` folders aren't crawlable from outside
GitHub's UI, so the exact route names couldn't be confirmed while building this.
`package.json` confirms it's an Express + Mongoose API with `bcryptjs` and
`jsonwebtoken` (JWT auth), matching the README's sample login credentials.

The endpoints below follow the same `getX` / `addX` / `updateX` / `deleteX`
convention the author used on the sibling fitnessAPI (`getMyWorkouts`,
`addWorkout`, `updateWorkout/:id`, ...), applied to posts instead of workouts:

| UI action        | Assumed endpoint            |
| ----------------- | --------------------------- |
| Register          | `POST /users/register`      |
| Log in            | `POST /users/login`         |
| Read all posts    | `GET /posts/getAllPosts`    |
| Read one post     | `GET /posts/getPost/:id`    |
| Read my posts     | `GET /posts/getMyPosts`     |
| Create a post      | `POST /posts/addPost`       |
| Edit a post        | `PATCH /posts/updatePost/:id`  |
| Delete a post      | `DELETE /posts/deletePost/:id` |

**If your actual blogpostAPI routes are named differently, everything is
isolated to two files** — `src/api/auth.js` and `src/api/posts.js` — so you
only need to update the path strings there, not the views or components.

The client also expects, and works around variance in:
- login/register responses shaped either as `{ token, name }` or `{ token, user: { name } }`
- list responses shaped either as a bare array or `{ posts: [...] }`
- posts with a `content` field and an optional populated `author: { name }`

## Setup

1. Make sure the [blogpostAPI](https://github.com/JCM-26/blogpostAPI) server is running
   somewhere (locally or deployed), with a MongoDB connection and `.env` configured
   per that repo's requirements.
2. Install dependencies:

   ```
   npm install
   ```

3. Copy the env file and point it at your API:

   ```
   cp .env.example .env
   # edit .env -> VITE_API_URL=http://localhost:4000
   ```

4. Run the dev server:

   ```
   npm run dev
   ```

5. Open the printed local URL (usually <http://localhost:5173>).

## Project structure

```
src/
├── api/
│   ├── http.js          # axios instance + auth header interceptor
│   ├── auth.js          # register/login calls
│   └── posts.js         # post endpoint calls
├── components/
│   └── PostCard.vue     # single post preview card for the feed
├── router/
│   └── index.js         # routes + auth guard
├── store/
│   └── auth.js          # small reactive auth store (token/name in localStorage)
├── utils/
│   └── notyf.js         # shared Notyf instance + helpers
├── views/
│   ├── PostsView.vue       # public feed of all posts
│   ├── PostDetailView.vue  # single post, full content
│   ├── MyPostsView.vue     # signed-in user's own posts (edit/delete)
│   ├── PostFormView.vue    # create/edit form (shared)
│   ├── LoginView.vue
│   └── RegisterView.vue
├── App.vue               # top nav bar + router-view
├── main.js
└── style.css
```

## Notes

- Reading posts (`/` and `/posts/:id`) is public; writing, editing, and
  deleting requires being logged in (route guard redirects to `/login`).
- All error responses from the API are caught and shown as Notyf error
  toasts using the server's `message` field when present.
- Post IDs always come from the URL, never the request body.
