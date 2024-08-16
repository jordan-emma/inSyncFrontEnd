import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
     {
      path: '/landing',
      name: 'Landing',
      component: () => import('../views/LandingView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/lobby',
      name: 'Lobby',
      component: () => import('../views/LobbyView.vue')
    },
    {
      path: '/play',
      name: 'Play',
      component: () => import('../views/PlayView.vue')
    }, 
    {
      path: '/clue',
      name: 'Clue',
      component: () => import('../views/ClueView.vue')
    },

  ]
})

export default router
