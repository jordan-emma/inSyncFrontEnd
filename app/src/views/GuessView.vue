<template>
  <div class="purpleBackground">
    <div class="pageContainer">
      <div class="back">
        <button class="rounded-button" @click="toggleBack">Back</button>
      </div>
      <div class="pageHeading">
        <h2 v-if="!headingText">{{ isClueGiver ? 'Your' : `${clueGiver}'s` }} Clue: {{ capitalizeString(prompt) }}</h2>
        <h2 v-if="headingText">{{headingText}}</h2>
      </div>
      <div class="slider-wrapper">
        <p>{{ capitalizeString(clueLow) }}</p>
        <Slider :min="0" :max="maxValue" :value="guessValue" @value-updated="setGuessValue" :disabled="isClueGiver" />
        <p>{{ capitalizeString(clueHigh) }}</p>
      </div>
      <transition name="slide-fade">
        <div class="answerSlider" v-if="sliderReveal">
          <div class="slider-wrapper">
            <p>{{ capitalizeString(clueLow) }}</p>
            <Slider :min="0" :max="maxValue" :value="value" :disabled="true"/>
            <p>{{ capitalizeString(clueHigh) }}</p>
          </div>
        </div>
      </transition>
      <div class="button-container">
        <transition name="fade">
          <button v-if="!isClueGiver && !sliderReveal" class="rounded-button" @click="submitAnswer">Submit</button>
        </transition>
        <transition name="fade">
          <button v-if="sliderReveal" class="rounded-button" @click="nextClue">Next</button>
        </transition>
        <message-alert
            :show="showAlert"
            :messageText="alertMessage"
            :messageIcon="alertIcon"
          />
      </div>
      <transition name="fade">
        <div v-if="!sliderReveal">
          <h2>{{ clueNumber }}/{{ totalCluesProvided }}</h2>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Slider from '@/components/slider.vue';
import messageAlert from '@/components/messageAlert.vue';

export default {
  components: {
    Slider, 
    messageAlert,
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
      showAlert: false,
      alertMessage: `Shhh! this is your clue... Don't give any hints`, 
      alertIcon: '',
      value: 0,
      sliderReveal: false,
    };
  },
  watch: {
    $clueStore: {
      deep: true,
      handler() {
        this.setClueProperties();
      },
    }, 
    isClueGiver(isClueGiverNow) {
      if (isClueGiverNow) {
        this.showAlert = true;
      }
    }
  },
  async created() {
    this.guessValue = this.getDefaultValue();
    this.fetchClue();
    this.alertIcon = (await import('@/images/quietIcon.png')).default;
  },
  computed: {
    isClueGiver() { 
      return this.$userStore.user.id === this.clueGiverId; 
    }, 
    headingText() {
    if (this.sliderReveal) {
      return 'Let\'s see how you did...';
    }
  }
  },
  methods: {
    toggleBack() {
      this.$router.push('/lobby');
    }, 
    async submitAnswer() { 
      this.sliderReveal = true;
      this.showAlert = false; 
      this.updateClueNumber();
    },
    async nextClue() {
      if (this.clueNumber < this.totalCluesProvided) {
        this.clueNumber++;
        this.sliderReveal = false; 
        this.fetchClue(); }
      // } else {
      //   this.$router.push('/results'); this will be when we are out of clues we need the next page to go to 
      // }
    },
    updateClueNumber() {
      this.clueNumber++;
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
        return;
      }
      this.prompt = data.clue;
      this.clueGiver = data.player_name;
      this.totalCluesProvided = data.total_clues;
      this.clueLow = data.low;
      this.clueHigh = data.high;
      this.clueGiverId = data.player_id;
      this.maxValue = data.max_value;
      this.clueId = data.id;
      this.guessValue = data.guess_value;
      this.value = data.value;
    },
    capitalizeString(string) { 
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    getDefaultValue() {
      return this.maxValue / 2;
    },
    async setGuessValue(value) {
      this.guessValue = value;
      try {
        let response = await this.$axios.patch(`/clue/${this.clueId}`, { guess_value: this.guessValue });
        if (response.status !== 200) {
          throw 'Failed to update guess value';
        }
      } catch (e) {
        console.log(e);
      }
    },
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

.slider-wrapper { 
  margin-bottom: 0;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}

</style>
