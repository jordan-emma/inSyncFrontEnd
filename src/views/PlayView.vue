<template>
  <div class="purpleBackground">
    <div class="pageContainer">
      <div class="back">
        <button
          class="rounded-button"
          @click="toggleBack"
          aria-label="Go back to landing page"
        >
          Back
        </button>
      </div>
      <div class="underlineButtonContainer">
        <button
          :class="buttonClass('join')"
          @click="toggleGameMode"
          aria-label="Switch to Join Game mode"
        >
          Join Game
        </button>
        <button
          :class="buttonClass('host')"
          @click="toggleGameMode"
          aria-label="Switch to Host Game mode"
        >
          Host Game
        </button>
      </div>
      <div v-if="showRoomCodeField" class="form-group">
        <label for="roomCode">Room code:</label>
        <input id="roomCode" type="text" v-model="code" aria-label="Enter room code" />
      </div>
      <div class="form-group">
        <label for="yourName">Your name:</label>
        <input id="yourName" type="text" v-model="name" aria-label="Enter your name" />
      </div>
      <div class="button-container">
        <button class="rounded-button" @click="startGame" aria-label="Start the game">
          Let's Play
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showRoomCodeField: true,
      name: this.$userStore.name,
      code: ''
    }
  },
  created() {
    this.$clueStore.clear()
    this.$gameStore.clear()
  },
  computed: {
    buttonClass() {
      return (type) => {
        if (type === 'host') {
          return !this.showRoomCodeField ? 'currentPageButton' : 'underlineButton';
        } else if (type === 'join') {
          return this.showRoomCodeField ? 'currentPageButton' : 'underlineButton';
        }
      };
    }
  },
  methods: {
    toggleGameMode() {
      this.showRoomCodeField = !this.showRoomCodeField
    },
    toggleBack() {
      this.$router.push('/landing')
    },
    async startGame() {
      this.$loading.yes()
      try {
        if (this.showRoomCodeField) {
          await this.joinGame()
        } else {
          await this.createGame()
        }
      } catch (e) {
        this.$error('Failed to start game.')
      }
      this.$loading.no()
    },
    async createGame() {
      try {
        await this.$gameStore.hostGame(this.name)
        this.$router.push('/lobby')
      } catch (e) {
        this.$error('Failed to make game.')
      }
    },
    async joinGame() {
      if (this.code.length !== 6) {
        this.$error('Invalid code, please try again!')
        return
      }
      try {
        await this.$gameStore.joinGame(this.name, this.code)
        this.$router.push('/lobby')
        this.$success('Game joined!')
      } catch (e) {
        this.$error('Failed to join game. Please check your game code and try again!')
      }
    }
  }
}
</script>

<style scoped>
.currentPageButton {
  background-color: #1a1138;
  color: white;
  border: none;
  padding: 0.9rem 0;
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  width: 10rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
  outline: none;
}
.underlineButton{
  font-size: 1.3rem;
}
</style>
