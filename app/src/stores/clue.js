import { defineStore } from 'pinia'

export const clueStore = defineStore('clue', {
  state: () => ({ clues: {} }),
  getters: {
    clue_by_id: (state) => (clue_id) => {
        try{
            return state.clues[clue_id]
        } catch (e){
            return null
        }
    }
  },
  actions:{
    update(clue){
      let clue_id = clue.id
      if (clue_id){
        this.clues[clue_id] = clue
      }
    }

  }, 
  persist: {
    enabled: true, 
    strategies: [
      { 
        key: 'clue',
        storage: localStorage,
      }
    ]
  }
})