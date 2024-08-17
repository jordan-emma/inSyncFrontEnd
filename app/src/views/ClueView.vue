<template>
  <div class="purpleBackground">
    <div class="pageContainer">
      <div class="back">
        <button @click="toggleBack">Back</button>
      </div>
      <div class="pageHeading">
        <h2>Type a Clue</h2>
      </div>
      <div>
        <Slider :min="0" :max="100" v-model="sliderValue" />
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
import Slider from '../components/Slider.vue'; 

export default {
  components: {
    Slider
  },
  data() {
    return {
      clue: 'Your clue...',
      clueNumber: 1,
      sliderValue: 50
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
  justify-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
}

  @media (max-width: 600px) {
  .container {
    width: 80vw; 
    height: 100vh; 
    align-items: center;
    align-content: center;
    justify-content: center;
    display: flex; 
  }
}

</style>
