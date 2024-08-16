<template>
  <div class="purpleBackground">
    <div class="container">
      <div class="back">
        <button @click="toggleBack">Back</button>
      </div>
      <div class="pageHeading">
        <h2>Type a Clue</h2>
      </div>
      <div>
        <p>Place holder for slider</p>
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
  export default {
    data() {
      return {
        clue: 'Your clue...',
        clueNumber: 1, 
      };
    }, 
    methods: {
      changeClueNumber() {
        this.clueNumber ++; 
      }, 
      toggleBack(){
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

  h2{
    color: white;
  }

</style>
