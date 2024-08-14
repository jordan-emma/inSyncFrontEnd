<template>
  <div class="background">
  <div class="container">
    <div class="back">
      <button @click="toggleBack">Back</button>
    </div>
    <div class="underlineButtonContainer">
      <button class="underlineButton" @click="toggleJoinGame">Join Game</button>
      <button class="underlineButton" @click="toggleHostGame">Host Game</button>
    </div>
    <div v-if="showRoomCodeField" class="form-group">
      <label for="roomCode">Room code:</label>
      <input id="roomCode" type="text" v-model="code"/>
    </div>
    <div class="form-group">
      <label for="yourName">Your name:</label>
      <input id="yourName" type="text" v-model="name" />
    </div>
    <div class="button-container">
      <button class="rounded-button" @click="startGame">Let's Play</button>
    </div>
  </div>
  </div>
</template>


<script>
import { useUserStore } from '@/stores/user.js'
import { gameStore } from '@/stores/game.js'
export default {
  created(){
    if(this.name === ''){
      this.name = this.userStore.name;
    }
  },
  data() {
    return {
      userStore: useUserStore(),
      gameStore: gameStore(),
      showRoomCodeField: true,
      name: '',
      code: '',
    }
  },
  methods: {
    toggleHostGame() {
      this.showRoomCodeField = false;
    },
    toggleJoinGame() {
      this.showRoomCodeField = true;
    }, 
    toggleBack() {
      this.$router.push('/landing');
    },
    async startGame() {
      if(this.showRoomCodeField) {
        await this.joinGame();
      } else {
        await this.createGame();
      }
    },
    async createGame() {
      let code = await this.gameStore.hostGame(this.name);
      console.log(code);
    },
    async joinGame() {
      if(this.code.length !== 6){
        console.log("Invalid code");
        return;
      }
      let code = await this.gameStore.joinGame(this.name, this.code);
      console.log(code);
    }
  }
}
</script>

<style scoped>
.background {
  background-image: url('../images/playBackground9.webp'); 
  background-size: cover; 
}

.back {
  position: absolute; 
  top: 1rem; 
  left: 1rem; 
  margin: 0; 
}

.back button {
  background: transparent; 
  border: none; 
  padding: 0.625rem 1.25rem; 
  font-size: 1.2rem; 
  font-weight: 800; 
  color: black; 
  text-decoration: underline; 
  text-decoration-thickness: 2px; 
  border-radius: 1.25rem; 
  cursor: pointer; 
  transition: background-color 0.3s ease, color 0.3s ease; 
  outline: none; 
}

.back button:hover {
  background-color: black; 
  color: white; 
}

.underlineButton{ 
  background: transparent; 
  border: none; 
  padding-bottom: 1rem;
  padding-top: 0.5rem; 
  font-size: 1.5rem; 
  font-weight: 600; 
  color: black; 
  text-decoration: underline;
  text-decoration-thickness: 4px; 
  text-align: center;
  cursor: pointer; 
  transition: background-color 0.3s ease, color 0.3s ease; 
  opacity: 1; 
  width: 10rem; 
  outline: none; 
  border-radius: 1.25rem;
}
.underlineButtonContainer{
  gap: 0.5em; 
}

.underlineButton:hover {
  background-color: black; 
  color: white; 
}
</style>
