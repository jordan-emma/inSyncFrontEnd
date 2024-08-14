import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({ user: null }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    name: (state) => state.user?.name,
  },
  actions: {
    setUser(user) {
      this.user = user
    }
  }
})

