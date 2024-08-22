<template>
  <div class="purpleBackground">
    <div class="pageContainer">
      <LoadingModal :show="loading" />
      <div class="back">
        <button class="rounded-button" @click="toggleBack">Back</button>
      </div>
      <div class="pageHeading">
        <h2>Type a Clue</h2>
      </div>
      <div v-if="gotClue" class="slider-wrapper">
        <p class="clueScalePhrase1">{{ capitalizeString(clueObject.high) }}</p>
        <Slider :min="0" :max="clueObject.max_value" :value="clueObject.value" :disabled="true" />
        <p class="clueScalePhrase2">{{ capitalizeString(clueObject.low) }}</p>
      </div>
      <section v-if="!submittedLastClue">
        <div class="form-group">
          <input
            id="clueField"
            type="text"
            v-model="currentClue"
            placeholder="Enter your clue..."
          />
        </div>
        <div class="button-container">
          <button v-if="clueNumber > 1" class="rounded-button" @click="changeClueNumber(false)">Back</button>
          <button class="rounded-button" @click="getClue(true)">New Scale</button>
          <button v-if="clueNumber < maxClues" class="rounded-button" :disabled="!isClueEntered" @click="changeClueNumber(true)">Next Clue</button>
          <button v-if="onLastClue" class="rounded-button" @click="addClue">Submit</button>
        </div>
      </section>
      <div>
        <h3 v-if="submittedLastClue">Waiting for other players...</h3>
      </div>
      <div>
        <h2>{{ clueNumber }}/3</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '../components/slider.vue'
import LoadingModal from '../components/loadingModal.vue'

export default {
  components: {
    Slider,
    LoadingModal
  },
  data() {
    return {
      currentClue: '',
      clueNumber: 1,
      clueObject: {},
      gotClue: false,
      maxClues: 3,
      gameWatcherInterval: null,
      gameStatus: null,
      loading: false,
      waiting: false,
      submittedLastClue: false,
    }
  },
  created() {
    this.getClue()
  },
  watch: {
    clueObject() {
      this.currentClue = this.clueObject.clue ?? ''
    },
    clueNumber() {
      this.getClue()
      if (this.onLastClue) {
        this.gameWatcherInterval = setInterval(this.getGame, 1000)
        this.waiting = true
      }
    },
    gameStatus() {
      if (this.gameStatus === 'GUESSING') {
        this.$router.push('/guess')
      }
    },
    currentClue(newClue) {
      this.isClueEntered = newClue.trim() !== ''
    },
  },
  computed: {
    isClueEntered() {
      return this.currentClue.trim() !== ''
    },
    onLastClue() {
      return this.clueNumber === this.maxClues
    },
  },
  methods: {
    async getGame() {
      let data = await this.$gameStore.getGame()
      this.gameStatus = data.status
    },
    async addClue() {
      let clue = this.currentClue.trim()
      if (clue) {
        let response = await this.$axios.patch(`/clue/${this.clueObject.id}`, { clue })
        if (response.status !== 200) {
          alert('Failed to add clue')
        } else if (this.onLastClue) {
          this.submittedLastClue = true
        }
      }
    },
    async getClue(refresh = false) {
      this.loading = true
      let url = `/game/${this.$gameStore.game.id}/clue/${this.clueNumber}`
      if (refresh) {
        url = `/clue/${this.clueObject.id}/refresh`
      }
      try {
        let response = await this.$axios.get(url)
        if (response.status !== 200) {
          throw 'Failed to get clue'
          this.gotClue = false
        }
        this.clueObject = response.data
        this.gotClue = true
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    async changeClueNumber(increment) {
      await this.addClue()
      this.clueNumber = increment ? this.clueNumber + 1 : this.clueNumber - 1
    },
    toggleBack() {
      this.$router.push('/lobby')
    },
    capitalizeString(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
  },
  beforeUnmount() {
    clearInterval(this.gameWatcherInterval)
  },
}
</script>

<style scoped>
.button-container {
  gap: 1rem;
  display: flex;
}

h2,
p {
  color: white;
}

@media (max-width: 600px) {
  .button-container {
    flex-direction: column-reverse;
    align-items: center;
  }
}

.rounded-button:disabled {
  background-color: darkgrey;
}

h3 {
  color: white;
  padding-top: 1em;
}

section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
