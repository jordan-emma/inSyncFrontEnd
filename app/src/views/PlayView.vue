<template>
  <div class="purpleBackground">
    <div class="pageContainer">
      <div class="back">
        <button class="rounded-button" @click="toggleBack">Back</button>
      </div>
      <div class="underlineButtonContainer">
        <button v-if="showRoomCodeField" class="currentPageButton" @click="toggleJoinGame">Join Game</button>
        <button v-if="!showRoomCodeField" class="underlineButton" @click="toggleJoinGame">Join Game</button>
        <button v-if="showRoomCodeField" class="underlineButton" @click="toggleHostGame">Host Game</button>
        <button v-if="!showRoomCodeField" class="currentPageButton" @click="toggleHostGame">Host Game</button>
      </div>
      <div v-if="showRoomCodeField" class="form-group">
        <label for="roomCode">Room code:</label>
        <input id="roomCode" type="text" v-model="code" />
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
  data() {
    return {
      showRoomCodeField: true,
      name: '',
      code: ''
    };
  },
  created() {
    if (this.name === '') {
      this.name = this.$userStore.name;
    } 
    this.$clueStore.clear();
    this.$gameStore.clear();
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
      this.$loading.yes();
      if (this.showRoomCodeField) {
        await this.joinGame();
      } else {
        await this.createGame();
      }
      this.$loading.no();
    },
    async createGame() {
      try {
        await this.$gameStore.hostGame(this.name);
        this.$router.push('/lobby');
      } catch (e) {
        console.log(e);
        alert('Failed to make game');
      }
    },
    async joinGame() {
      if (this.code.length !== 6) {
        console.log('Invalid code');
        return;
      }
      await this.$gameStore.joinGame(this.name, this.code);
      this.$router.push('/lobby');
    }
  }
}
</script>

<style scoped>
.underlineButton:hover {
  background-color: #1a1138;
  color: white;
}

.currentPageButton {
  background-color: #1a1138;
  color: white;
  border: none;
  padding: 0.9rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  width: 10rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
  outline: none;
}
</style>
