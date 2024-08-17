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
        <p>{{ clueObject.high }}</p>
        <Slider :min="0" :max="100" v-model="sliderValue" :disabled="disableSlider" /> 
        <p>{{ clueObject.low }}</p>
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
  created(){
      this.getClue(); 
    },
  components: {
    Slider
  },
  data() {
    return {
      clue: 'Your clue...',
      clueNumber: 1,
      sliderValue: 50,
      disableSlider: true,
      clueObject: {},
    };
  },
  methods: {
    changeClueNumber() {
      this.clueNumber++;
    },
    toggleBack() {
      this.$router.push('/lobby');
    }, 
   async getClue(){
    let response = await this.$axios.get(`/game/${this.$gameStore.game.id}/clue/${this.clueNumber}`)
    if (response.status !== 200){
      throw 'Failed to get clue'
    }
        console.log(response.data); 
        this.clueObject = response.data; 
    }, 
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
}



</style>
