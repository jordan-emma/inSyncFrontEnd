<template>
  <div class="purpleBackground">
    <div class="pageContainer">
      <div class="back">
        <button @click="toggleBack">Back</button>
      </div>
      <div class="pageHeading">
        <h2>Type a Clue</h2>
      </div>
      <div v-if="gotClue" class="slider-wrapper">
        <p class="clueScalePhrase1">{{ clueObject.high }}</p>
        <Slider :min="0" :max="clueObject.max_value" :value="clueObject.value" :disabled="true" />
        <p class="clueScalePhrase2">{{ clueObject.low }}</p>
      </div>
      <div class="form-group">
        <input id="clueField" type="text" v-model="currentClue" placeholder='Enter your clue...' />
      </div>
      <div class="button-container">
        <button v-if="clueNumber > 1" class="rounded-button" @click="changeClueNumber(false)">Back</button>
        <button class="rounded-button" @click="getClue(true)">New Scale</button>
        <button v-if="clueNumber < maxClues" class="rounded-button" @click="changeClueNumber(true)">Next Clue</button>
        <button v-if="clueNumber === maxClues" class="rounded-button" @click="goToGuess">Submit</button>
      </div>
      <div>
        <h2>{{ clueNumber }}/3</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '../components/slider.vue'

export default {
  created() {
    this.getClue()
  },
  components: {
    Slider
  },
  data() {
    return {
      currentClue: '',
      clueNumber: 1,
      clueObject: {},
      gotClue: false,
      maxClues: 3
    }
  },
  watch: {
    clueObject() {
      this.currentClue = this.clueObject.clue
    },
    clueNumber() {
      this.getClue()
    }
  },
  methods: {
    async addClue() {
      let clue = this.currentClue.trim();
      if (clue) {
        let response = await this.$axios.patch(`/clue/${this.clueObject.id}`, {clue})
        if (response.status !== 200) {
          alert('Failed to add clue')
        }
        console.log('Clue added')
      }
    },
    async getClue(refresh=false) {
      let url = `/game/${this.$gameStore.game.id}/clue/${this.clueNumber}`
      if(refresh){
        url = `/clue/${this.clueObject.id}/refresh`
      }
      let response = await this.$axios.get(url)
      if (response.status !== 200) {
        throw 'Failed to get clue'
        this.gotClue = false
      }
      this.clueObject = response.data
      this.gotClue = true
    },
    async changeClueNumber(increment) {
      this.clueNumber = increment ? this.clueNumber + 1 : this.clueNumber - 1
      await this.addClue()
    },
    toggleBack() {
      this.$router.push('/lobby')
    },
    async goToGuess() {
      await this.addClue()
      this.$router.push('/guess')
    },
  }
}

</script>


<style scoped>

.button-container {
  gap: 1rem;
  display: flex;
}

h2, p {
  color: white;
}

.button-container {
  gap: 1rem;
  display: flex;
}


</style>
