import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({ user: null }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    name: (state) => state.user?.name,
    id: (state) => state.user?.id
  },
  actions: {
    async login(email, password) {
      let response = await axios.post('login', { email, password })
      if (response.status !== 200){
        throw 'Failed to log in'
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      response = await axios.get('user')
      if (response.status !== 200){
        throw 'Failed to get user data'
      }
      this.user = response.data
    },
  }
})

