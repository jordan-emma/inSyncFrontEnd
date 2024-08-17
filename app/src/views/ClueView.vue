<template>
  <div class="purpleBackground">
    <div class="pageContainer">
      <div class="back">
        <button @click="toggleBack">Back</button>
      </div>
      <div class="pageHeading">
        <h2>Type a Clue</h2>
      </div>
      <div class="slider-wrapper">
        <p>Scale</p>
        <Slider :min="0" :max="100" v-model="sliderValue" :disabled="disableSlider" /> 
        <p>Scale</p>
      </div>
      <div>
        <p>Value: {{ sliderValue }}</p>
      </div>
      <div class="form-group">
        <input id="clueField" type="text" v-model="clue"/>
      </div>
      <div class="button-container">
        <button class="rounded-button">New Scale</button>
        <button v-if="clueNumber < 3" class="rounded-button" @click="changeClueNumber">Next Clue</button>
        <button v-if="clueNumber === 3" class="rounded-button">Submit</button>
      </div>
      <div>
        <h2>{{clueNumber}}/3</h2>
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
      clue: 'Your clue...',
      clueNumber: 1,
      sliderValue: 50,
      disableSlider: true,
    };
  },
  methods: {
    changeClueNumber() {
      this.clueNumber++;
    },
    toggleBack() {
      this.$router.push('/lobby');
    }
  }
}
</script>


<style scoped>

  .button-container{
    gap: 1rem; 
    display: flex; 
  }

  h2, p{
    color: white;
  }

  .pageContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

.slider-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%; 
  max-width: 600px; 
  margin: 1rem 0; 
}

.slider-wrapper p {
  margin: 0;
  padding: 0 1em; 
  color: white;
  font-weight: 500;
  font-size: 1.5em; 
}

@media (max-width: 600px) {
  .slider-wrapper {
    width: 90%; 
  }

  .slider-wrapper h4 {
    font-size: 1em; 
  }
}

.button-container {
  gap: 1rem;
  display: flex;
}

h2, p {
  color: white;
}


</style>
