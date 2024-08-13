<template>
  <div class="background">
  <div class="container">
    <div class="name">
      <h1>INSYNC</h1>
    </div>
    <div class="button-container">
      <button class="rounded-button" @click="togglePlay">PLAY</button>
      <button class="rounded-button">HOW TO PLAY</button>
    </div>
  </div>
  </div>
</template>

<style>
.background{
    background-image: url('../images/logo2.avif'); 
    background-size: contain;
}

  .button-container {
    display: flex;
    flex-direction: column; 
    align-items: center;    
    gap: 0.625rem;              
  }


</style>

<script>
export default {
methods: {
togglePlay() {
      this.$router.push('/play');
    }
}
}
</script>