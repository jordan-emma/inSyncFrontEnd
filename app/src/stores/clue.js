import { defineStore } from 'pinia'
import axios from 'axios'

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
    },
    clear(){
      this.clues = {}
    },
    async fetchClue(clue_id){
      let response = await axios.get(`clue/${clue_id}`)
      if (response.status !== 200){
        throw 'Failed to get clue'
      }
      this.update(response.data)
      return response.data
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