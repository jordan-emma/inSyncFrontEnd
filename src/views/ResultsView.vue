<template>
  <div class="purpleBackground">
    <div class="pageContainer">
      <ResultsModal
        :show="true"
        :header="modalTitle"
        :blocks="modalBlocks"
        :modalHeading="modalHeading"
      />
    </div>
  </div>
</template>

<script>
import ResultsModal from '@/components/ResultsModal.vue'

export default {
  components: {
    ResultsModal
  },
  data() {
    return {
      modalTitle: 'Total Points: ',
      modalHeading: 'Results',
      modalBlocks: []
    }
  },
  methods: {
    setBlocks() {
      let game_id = this.$gameStore.id
      let clues = this.$clueStore.getCluesForGame(game_id)
      return clues.map((clue) => {
        return {
          title: 'Clue',
          body: clue.prompt,
          max_value: clue.max_value,
          low_value: clue.low,
          guess_value: clue.guess_value,
          target_value: clue.value,
          low_prompt: clue.low,
          high_prompt: clue.high,
          score: clue.score,
          player_name: clue.player_name
        }
      })
    }
  },
  created() {
    if (!this.$userStore.isLoggedIn && this.$gameStore.empty) {
      return
    }
    this.modalBlocks = this.setBlocks()
  }
}
</script>
