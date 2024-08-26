<template>
  <div>
    <div class="pageHeading">
      <h2>Let's see how you did...</h2>
      <h2>Clue: {{ prompt }}</h2>
    </div>
    <div class="slider-wrapper">
      <p>{{ clueObject.low }}</p>
      <Slider :min="0" :max="clueObject.max_value" :value="clueObject.guess_value" :disabled="true" />
      <p>{{ clueObject.high }}</p>
    </div>
    <div class="slider-wrapper">
      <p>{{ clueObject.low }}</p>
      <Slider :min="0" :max="clueObject.max_value" :value="clueObject.value" :disabled="true" />
      <p>{{ clueObject.high }}</p>
    </div>
    <div class="button-container">
      <button v-if='host' class="rounded-button" @click="goToNextClue">Next</button>
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
  methods: {
    async goToNextClue() {
      if(this.$gameStore.game.status === 'FINISHED'){ 
        this.$router.push('/results');
        return
      }
      try {
        this.$loading.yes();
        await this.$gameStore.setNextGuessId();
      } catch (e) {
        console.log(e);
      } finally {
        this.$loading.no();
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

