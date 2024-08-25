<template>
  <div class="purpleBackground">
    <div class="pageContainer">
      <div class="back">
        <button class="rounded-button" @click="toggleBack">Back</button>
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
      loading: false,
      maxValue: 0,
      clueId: 0,
      clueObject: {},
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
    this.fetchClue();
  },
  computed: {
    clueGiverName() {
      return this.isClueGiver ? 'Your' : `${this.clueGiver}'s`;
    },
    isClueGiver() { 
      return this.$userStore.user.id === this.clueGiverId; 
    },
    isHost() {
      return this.$gameStore.hostPlayerId === this.$userStore.id;
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
      this.clueObject = data;
      this.prompt = data.prompt;
      this.clueGiver = data.player_name;
      this.totalCluesProvided = data.total_clues;
      this.clueGiverId = data.player_id;
      this.clueId = data.id;
    },
    capitalizeString(string) { 
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

  }
}
</script>


