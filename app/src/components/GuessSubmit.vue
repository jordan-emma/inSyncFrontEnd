<template>
  <div>
    <div class="pageHeading">
      <h2>{{ clueGiverName }} Clue: {{ prompt }}</h2>
    </div>
    <div class="slider-wrapper">
      <p>{{ clueObject.low }}</p>
      <Slider :min="0" :max="clueObject.max_value" :value="clueObject.guess_value" @value-updated="setGuessValue" :disabled="!canEdit" />
      <p>{{ clueObject.high }}</p>
    </div>
    <div class="button-container">
      <button v-if='canEdit' class="rounded-button" @click="closeClue">Submit</button>
      <p v-if='!canEdit'>Shhh! this is your clue... Don't give any hints </p>
    </div>
    <div>
      <h2>{{ clueNumber }}/{{ clueObject.total_clues }}</h2>
    </div>
  </div>

</template>

<script>
import Slider from '@/components/slider.vue'

export default {
  name: 'GuessSubmit',
  components: { Slider },
  props:{
    canEdit: {
      type: Boolean,
      required: true
    },
    clueGiverName:{
      type: String,
      required: true
    },
    prompt:{
      type: String,
      required: true
    },
    clueNumber:{
      type: Number,
      required: true
    },
    clueObject:{
      type: Object,
      required: true
    }
  },
  methods: {
    async setGuessValue(guess_value) {
      try {
        let response = await this.$axios.post(`/clue/${this.clueObject.id}/guess`, {guess_value});
        if (response.status !== 200) {
          throw 'Failed to update guess value';
        }
      } catch (e) {
        console.log(e);
      }
    },
    async closeClue() {
      try {
        let response = await this.$axios.post(`/clue/${this.clueObject.id}/close`);
        if (response.status !== 200) {
          throw 'Failed to close clue';
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

