import { defineStore } from 'pinia'

export const loadingStore = defineStore('loading', {
  state: () => ({ loading: false }),
  actions:{
    yes(){
     this.loading = true
    },
    no(){
      this.loading = false
    },
  }, 
})