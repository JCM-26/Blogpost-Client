import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn } from '../store/auth'

const routes = [
  {
    path: '/',
    name: 'posts',
    component: () => import('../views/PostsView.vue'),
  },
  {
    path: '/posts/:id',
    name: 'post-detail',
    component: () => import('../views/PostDetailView.vue'),
    props: true,
  },
  {
    path: '/my-posts',
    name: 'my-posts',
    component: () => import('../views/MyPostsView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/posts/new',
    name: 'post-new',
    component: () => import('../views/PostFormView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/posts/:id/edit',
    name: 'post-edit',
    component: () => import('../views/PostFormView.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
