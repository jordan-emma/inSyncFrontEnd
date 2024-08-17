import { defineStore } from 'pinia'
import axios from 'axios'

export const userStore = defineStore('user', {
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
      response = await axios.get('player')
      if (response.status !== 200){
        throw 'Failed to get user data'
      }
      this.user = response.data
    },
    async signUp(name, email, password, confirm_password) {
      let response = await axios.post('signup', {name, email, password, confirm_password})
      if (response.status !== 201){
        throw 'Failed to sign up'
      }
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      response = await axios.get('player')
      if (response.status !== 200){
        throw 'Failed to get user data'
      }
      this.user = response.data
    },
  }
})

