import http from './http'

// Same caveat as auth.js: these paths mirror the getX/addX/updateX/deleteX
// convention from the author's fitnessAPI (getMyWorkouts, addWorkout,
// updateWorkout/:id, deleteWorkout/:id) applied to posts. Adjust here if
// blogpostAPI's real routes turn out to be named differently.

export function getAllPosts() {
  return http.get('/posts/')
}

export function getPost(id) {
  return http.get(`/posts/${id}`)
}

export function getMyPosts() {
  return http.get('/posts/getMyPosts')
}

export function addPost({ title, content, information }) {
  return http.post('/posts/', { title, content, information })
}

export function updatePost(id, { title, content, information }) {
  return http.patch(`/posts/${id}`, { title, content, information })
}

export function deletePost(id) {
  return http.delete(`/posts/${id}`)
}