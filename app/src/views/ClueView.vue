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
      <button class="rounded-button">Submit</button>
    </div>
    <div>
      <h2>1/3</h2>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        clue: 'Your clue...',
      };
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
