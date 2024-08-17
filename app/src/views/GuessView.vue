<template>
  <div class="purpleBackground">
    <div class="pageContainer">
      <div class="back">
        <button @click="toggleBack">Back</button>
      </div>
      <div class="pageHeading">
        <h2>This is where the clue provided goes</h2>
      </div>
      <div class="slider-wrapper">
        <p>Scale</p>
        <Slider :min="0" :max="100" v-model="sliderValue"/> 
        <p>Scale</p>
      </div>
      <div class="button-container">
        <button class="rounded-button" @click="changeClueNumber">Submit</button>
      </div>
      <div>
        <h2>{{clueNumber}}/{{ totalCluesProvided }}</h2>
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
      clueNumber: 1,
      totalCluesProvided: 'total clues provided',
      sliderValue: 50,
      disableSlider: false,
    };
  },
  methods: {
    toggleBack() {
      this.$router.push('/lobby');
    }, 
    changeClueNumber() {
      this.clueNumber++;
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

.button-container {
  gap: 1rem;
  display: flex;
  padding-top: 2em; 
}

h2, p {
  color: white;
}


</style>
