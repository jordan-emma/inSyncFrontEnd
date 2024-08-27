import { defineStore } from 'pinia'
import axios from 'axios'
export const gameStore = defineStore('game', {
  state: () => ({ game: null, players: [] }),
  getters: {
    code: (state) => state.game?.game_code, 
    playerNames: (state) => state.players.map(i => i.display_name), 
    hostPlayerName: (state) => {
      return state.players.find(player => player.host === true)?.display_name;
    },
    hostPlayerId: (state) => {
      return state.players.find(player => player.host === true)?.player_id;
    },
    empty: (state) => { 
      return state.game?.id ? false : true; 
    }
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
    async getPlayers() {
      let response = await axios.get(`game/${this.game.id}/players`)
      if (response.status !== 200){
        throw 'Failed to get players'
      }
      this.players = response.data; 
      return response.data; 
    },
    async getGame() {
      let response = await axios.get(`game/${this.game.id}`)
      if (response.status !== 200){
        throw 'Failed to get game'
      }
      this.game = response.data;
      return response.data;
    },
    async setNextGuessId() {
      let response = await axios.post(`game/${this.game.id}/guess/next`)
      if (response.status !== 200){
        throw 'Failed to set next guess id'
      }
      return response.data;
    }, 
    clear() { 
      this.game=null;
      this.players=[];
    },
  }, 
  persist: {
    enabled: true, 
    strategies: [
      { 
        key: 'game',
        storage: localStorage,
      }
    ]
  }
})