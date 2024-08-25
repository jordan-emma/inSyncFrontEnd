<template>
  <div class="purpleBackground">
    <div class="pageContainer">
      <div class="back">
        <button class="rounded-button" @click="toggleBack">Back</button>
      </div>
      <div class="pageHeading">
        <h2>{{ isClueGiver ? 'Your' : `${clueGiver}'s` }} Clue: {{ capitalizeString(prompt) }}</h2>
      </div>
      <div class="slider-wrapper">
        <p>{{ capitalizeString(clueLow) }}</p>
        <Slider :min="0" :max="maxValue" :value="guessValue" @value-updated="setGuessValue" :disabled="isClueGiver" />
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
import Slider from '@/components/slider.vue';

export default {
  components: {
    Slider
  },
  data() {
    return {
      clueNumber: 1,
      totalCluesProvided: 'total clues provided',
      prompt: '',
      clueGiver: '',
      clueLow: '',
      clueHigh: '',
      clueGiverId: 0,
      loading: false,
      guessValue: 0,
      maxValue: 0,
      clueId: 0,
    };
  },
  watch: {
    $clueStore: {
      deep: true,
      handler() {
        this.setClueProperties();
      },

    }
  },
  async created() {
    this.guessValue = this.getDefaultValue();
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
        this.$clueStore.update(response.data);
        this.clueId = response.data.id;
        this.setClueProperties();
      } finally { 
        this.loading = false; 
      }
    },
    setClueProperties() {
      let data = this.$clueStore.clue_by_id(this.clueId);
      if (!data) {
        return
      }
      this.prompt = data.prompt;
      this.clueGiver = data.player_name;
      this.totalCluesProvided = data.total_clues;
      this.clueLow = data.low;
      this.clueHigh = data.high;
      this.clueGiverId = data.player_id;
      this.maxValue = data.max_value;
      this.clueId = data.id;
      this.guessValue = data.guess_value;
    },
    capitalizeString(string) { 
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    getDefaultValue(){
      return this.maxValue/2;
    },
    async setGuessValue(value) {
      this.guessValue = value;
      try {
        let response = await this.$axios.post(`/clue/${this.clueId}/guess`, {guess_value: this.guessValue});
        if (response.status !== 200) {
          throw 'Failed to update guess value';
        }
      } catch (e) {
        console.log(e);
      }
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
