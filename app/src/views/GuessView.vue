<template>
  <div class="purpleBackground">
    <div class="pageContainer">
      <div class="back">
        <button class="rounded-button" @click="toggleBack">Back</button>
      </div>
      <div class="pageHeading">
        <h2>{{ isClueGiver ? 'Your' : `${clueGiver}'s` }} Clue: {{ capitalizeString(fetchedClue) }}</h2>
      </div>
      <div class="slider-wrapper">
        <p>{{ capitalizeString(clueLow) }}</p>
        <Slider :min="0" :max="maxValue" :value="defaultValue" v-model="guessValue" :disabled="isClueGiver" />
        <p>{{ capitalizeString(clueHigh) }}</p>
      </div>
      <div class="button-container">
        <button v-if='!isClueGiver' class="rounded-button" @click="changeClueNumber">Submit</button>
        <p v-if='isClueGiver'>Shhh! this is your clue... Don't give any hints </p>
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
      fetchedClue: '',
      clueGiver: '',
      clueLow: '', 
      clueHigh: '', 
      clueGiverId: '',
      loading: false,
      guessValue: '',
      maxValue: '',
      defaultValue: '',
      clueId: '', 
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
        this.maxValue = response.data.max_value; 
        this.clueId = response.data.id; 
        this.setDefaultValue(); 
      } finally { 
        this.loading = false; 
      }
    }, 
    capitalizeString(string) { 
      return string.charAt(0).toUpperCase() + string.slice(1);
    }, 
    setDefaultValue(){ 
      return this.defaultValue = this.maxValue/2; 
    },
    // async sendGuessValue() { 
    //   this.loading = true; 
    //   try{ 
    //     let response = await axios.patch(`/clue/${this.clueId}`, {guess_value: this.guessValue}); //the first is the url we are going to and the second prop is the object key and then the valuewe are udating 
    //     if (response.status != 200){ 
    //       throw 'Failed to submit clue'
    //     }
    //     this.

    //   }
    // }
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
