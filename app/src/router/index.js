import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Base from '@/views/Base.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Base,
      children: [
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
        {
          path: '/guess',
          name: 'Guess',
          component: () => import('../views/GuessView.vue')
        },
      ]
    },
  ]
})

export default router
