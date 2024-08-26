<template>
  <div>
    <div class="pageHeading">
      <h2>Let's see how you did...</h2>
    </div>
    <div>
      <p class="prompt">{{ clueObject.player_name }}'s Clue: {{ prompt }}</p>
      <div class="slider-wrapper">
        <p>{{ clueObject.low }}</p>
        <Slider :max="clueObject.max_value" :value="clueObject.value" :disabled="true" />
        <p>{{ clueObject.high }}</p>
      </div>
      <p class="prompt">Your guess:</p>
      <div class="slider-wrapper">
        <p>{{ clueObject.low }}</p>
        <Slider :max="clueObject.max_value" :value="clueObject.guess_value" :disabled="true" />
        <p>{{ clueObject.high }}</p>
      </div>
    </div>
    <div class="button-container">
      <button v-if='host && !isGameFinished' class="rounded-button" @click="goToNextClue">Next</button>
      <button v-if="isGameFinished" class="rounded-button" @click="goToResults">Results</button>
    </div>
  </div>

</template>

<script>
import Slider from '@/components/slider.vue'

export default {
  name: 'GuessReveal',
  components: { Slider },
  props:{
    prompt:{
      type: String,
      required: true
    },
    clueObject:{
      type: Object,
      required: true
    },
    host: {
      type: Boolean,
      required: true
    }
  },
  computed: { 
    isGameFinished(){ 
      return this.$gameStore.game.status === 'FINISHED';
    }
  },
  methods: {
    async goToNextClue() {
      try {
        this.$loading.yes();
        await this.$gameStore.setNextGuessId();
      } catch (e) {
        console.log(e);
      } finally {
        this.$loading.no();
      }
    }, 
    goToResults(){ 
      if(this.isGameFinished){ 
        this.$router.push('/results');
        return
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
  justify-content: center;
}

h2, p {
  color: white;
}

.prompt { 
  font-size: 2em;
  justify-content: center;
  display: flex;
}
.pageHeading { 
  margin-bottom: 2em;
}

@media (max-width: 600px) {
  .pageHeading  {
    margin-bottom: auto;
    margin-top: 2em;
  }
  .slider-wrapper{
    display: flex;
    width: auto; 
    margin-bottom: 1em;
    padding-bottom: 0;
  }
}

@media (max-width: 1024px) and (max-height: 600px) {
  .pageHeading  {
    margin-bottom: auto;
    margin-top: 2em;
  }

  .slider-wrapper {
    display: flex;
    justify-content: center; 
    align-items: center;     
    width: 100%;             
    margin: 0 auto;          
    padding-bottom: 0;
  }
  .button-container {
  padding-bottom: 1em;
}
}

</style>

