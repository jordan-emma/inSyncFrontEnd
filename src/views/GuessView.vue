<template>
  <div class="purpleBackground">
    <div class="pageContainer">
      <div class="back">
        <button class="rounded-button" @click="toggleBack">Exit</button>
      </div>
      <guess-submit
        v-if="clueObject.status === 'OPEN'"
        :clue-giver-name="clueGiverName"
        :prompt="capitalizeString(prompt)"
        :clueId="clueId"
        :canEdit="!isClueGiver"
        :clueNumber="clueNumber"
        :clueObject="clueObject"
      />
      <guess-reveal
        v-if="clueObject.status === 'CLOSED'"
        :host="isHost"
        :prompt="capitalizeString(prompt)"
        :clueObject="clueObject"
      />
    </div>
  </div>
</template>

<script>
import GuessSubmit from '@/components/GuessSubmit.vue'
import GuessReveal from '@/components/GuessReveal.vue'

export default {
  components: {
    GuessSubmit,
    GuessReveal
  },
  data() {
    return {
      clueNumber: 1,
      totalCluesProvided: 'total clues provided',
      prompt: '',
      clueGiver: '',
      clueGiverId: 0,
      maxValue: 0,
      clueId: this.$gameStore.game?.current_clue_id,
      clueObject: {}
    }
  },
  watch: {
    $gameStore: {
      deep: true,
      handler() {
        this.clueId = this.$gameStore.game.current_clue_id
      }
    },
    $clueStore: {
      deep: true,
      handler() {
        this.setClueProperties()
      }
    },
    clueId() {
      this.setClueProperties()
    }
  },
  async created() {
    if (!this.$userStore.isLoggedIn && this.$gameStore.empty) {
      return
    }
    this.setClueProperties()
  },
  computed: {
    clueGiverName() {
      return this.isClueGiver ? 'Your' : `${this.clueGiver}'s`
    },
    isClueGiver() {
      return this.$userStore.user.id === this.clueGiverId
    },
    isHost() {
      return this.$gameStore.hostPlayerId === this.$userStore.id
    }
  },
  methods: {
    toggleBack() {
      this.$router.push('/play')
    },
    changeClueNumber() {
      if (this.clueNumber < this.totalCluesProvided) {
        this.clueNumber++
      }
    },
    async setCurrentClue() {
      if (!this.isHost) {
        return
      }

      if (!this.clueId) {
        try {
          await this.$gameStore.setNextGuessId()
        } catch (e) {
          console.log(e)
        }
      }
    },
    setClueProperties() {
      if (!this.clueId) {
        this.setCurrentClue()
        return
      }
      let data = this.$clueStore.clue_by_id(this.clueId)
      if (!data) {
        this.$clueStore.fetchClue(this.clueId)
        return
      }
      this.clueObject = data
      this.prompt = data.prompt
      this.clueGiver = data.player_name
      this.totalCluesProvided = data.total_clues
      this.clueGiverId = data.player_id
      this.clueId = data.id
    },
    capitalizeString(string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }
}
</script>
