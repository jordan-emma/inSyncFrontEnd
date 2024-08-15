import { defineStore } from 'pinia'
import axios from 'axios'

export const gameStore = defineStore('game', {
  state: () => ({ game: null, players: [] }),
  getters: {
    code: (state) => state.game?.game_code
  },
  actions:{
    async hostGame(display_name) {
      let response = await axios.post('game', {display_name})
      if (response.status !== 201){
        throw 'Failed to make game'
      }
      this.game = response.data;
      return response.data.game_code;
    },
    async joinGame(display_name, game_code) {
      let response = await axios.post('game/join', {display_name, game_code})
      if (response.status !== 200){
        throw 'Failed to join game'
      }
      this.game = response.data;
      return game_code;
    }, 
    async getPlayers(){
      console.log('Getting Players....')
      let response = await axios.get(`game/${this.game.id}/players`)
      if (response.status !== 200){
        throw 'Failed to get players'
      }
      this.players = response.data; 
      return response.data; 
    }, 

  }
})