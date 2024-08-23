<template>
  <div class="purpleBackground">
    <div class="pageContainer">
      <div class="back">
        <button class="rounded-button" @click="toggleBack">Back</button>
      </div>
      <div class="pageHeading">
        <h2>{{ clueGiver }}'s Clue: {{ capitalizeString(fetchedClue) }}</h2>
      </div>
      <div class="slider-wrapper">
        <p>{{ capitalizeString(clueLow) }}</p>
        <Slider :min="0" :max="100" v-model="sliderValue" :disabled="isClueGiver" />
        <p>{{ capitalizeString(clueHigh) }}</p>
      </div>
      <div class="button-container">
        <button class="rounded-button" @click="changeClueNumber">Submit</button>
      </div>
      <div>
        <h2>{{ clueNumber }}/{{ totalCluesProvided }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '../components/slider.vue'; 

export default {
  components: {
    Slider
  },
  data() {
    return {
      clueNumber: 1,
      totalCluesProvided: 'total clues provided',
      sliderValue: 50,
      fetchedClue: '',
      clueGiver: '',
      clueLow: '', 
      clueHigh: '', 
      clueGiverId: '',
      loading: false,
    };
  },
  created() {
    this.fetchClue();
  },
  computed: {
    isClueGiver() { 
      return this.$userStore.user.id === this.clueGiverId; 
    }
  },
  methods: {
    toggleBack() {
      this.$router.push('/lobby');
    }, 
    changeClueNumber() {
      if(this.clueNumber < this.totalCluesProvided){
        this.clueNumber++;
      }
    }, 
    async fetchClue() { 
      this.loading = true; 
      try { 
        let response = await this.$axios.get(`/game/${this.$gameStore.game.id}/guess`);
        if (response.status !== 200) {
          throw 'Failed to get clue';
        }
        this.fetchedClue = response.data.clue;
        this.clueGiver = response.data.player_name;
        this.totalCluesProvided = response.data.total_clues;
        this.clueLow = response.data.low;
        this.clueHigh = response.data.high;
        this.clueGiverId = response.data.player_id;
      } finally { 
        this.loading = false; 
      }
    }, 
    capitalizeString(string) { 
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
}
</script>

<style scoped>
.button-container {
  display: flex;
  gap: 1rem;
  padding-top: 2em;
}

h2, p {
  color: white;
}
</style>
