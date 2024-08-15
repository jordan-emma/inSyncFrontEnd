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
export default {
  created(){
    if(this.name === ''){
      this.name = this.$userStore.name;
    }
  },
  data() {
    return {
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
      try{
        let code = await this.$gameStore.hostGame(this.name);
        this.$router.push('/lobby');
      } 
      catch(e){
          console.log(e);
          alert('Failed to make game'); 
        }
      }    
    },
    async joinGame() {
      if(this.code.length !== 6){
        console.log("Invalid code");
        return;
      }
      let code = await this.$gameStore.joinGame(this.name, this.code);
      console.log(code);
    }
  }
  
</script>

<style scoped>
.background {
  background-image: url('../images/background.jpg');
  background-size: cover; 
}

.underlineButtonContainer{
  gap: 0.5em; 
}

.underlineButton:hover {
  background-color: black; 
  color: white; 
}
</style>
