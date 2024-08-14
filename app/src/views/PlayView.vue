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
      <input id="roomCode" type="text"/>
    </div>
    <div class="form-group">
      <label for="yourName">Your name:</label>
      <input id="yourName" type="text"/>
    </div>
    <div class="button-container">
      <button class="rounded-button" @click="togglePlay">Let's Play</button>
    </div>
  </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      showRoomCodeField: true 
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
    togglePlay() {
      this.$router.push('/lobby');
    }
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
