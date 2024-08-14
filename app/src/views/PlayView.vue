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
      <button class="rounded-button">Let's Play</button>
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
