<template>
  <div>
    <div class="pageHeading">
      <h2>
        {{ clueGiverName }} Clue: {{ prompt }}
      </h2>
    </div>
    <div class="slider-wrapper">
      <p aria-label="Low range value">{{ clueObject.low }}</p>
      <Slider
        :max="clueObject.max_value"
        :value="clueObject.guess_value"
        @value-updated="setGuessValue"
        :disabled="!canEdit"
        aria-label="Guess slider"
      />
      <p aria-label="High range value">{{ clueObject.high }}</p>
    </div>
    <div class="button-container">
      <button
        v-if='canEdit'
        class="rounded-button"
        @click="closeClue"
        aria-label="Submit your guess"
      >
        Submit
      </button>
      <message-alert
        :show="!canEdit"
        messageText="Shhh! this is your clue... Don't give any hints"
        :messageIcon="alertIcon"
        aria-label="Alert message: This is your clue, don't give any hints"
      />
    </div>
  </div>
</template>


<script>
import Slider from '@/components/slider.vue'
import MessageAlert from '@/components/MessageAlert.vue'

export default {
  name: 'GuessSubmit',
  components: { MessageAlert, Slider },
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
  data() {
    return {
      alertIcon: '',
    }
  },
  async created() {
    try {
      this.alertIcon = (await import('@/images/quietIcon.png')).default;
    } catch (e) {
      this.$error('Error loading alert icon');
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
        this.$error('Error updating guess value');
      }
    },
    async closeClue() {
      try {
        let response = await this.$axios.post(`/clue/${this.clueObject.id}/close`);
        if (response.status !== 200) {
          throw 'Failed to close clue';
        }
      } catch (e) {
        this.$error('Failed to close clue');
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
</style>

