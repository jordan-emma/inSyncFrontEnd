<template>
  <div class="background-container">
    <modal :show="showModal" @close="toggleModal">
      <h1>Hello</h1>
    </modal>
    <div class="spinning-background"></div>
    <div class="content">
      <button class="rounded-button" id="logOut" @click="logOut">Log Out</button>
      <div class="name">
        <h1>INSYNC</h1>
      </div>
      <div class="button-container">
        <button class="rounded-button" @click="togglePlay">PLAY</button>
        <button class="rounded-button" @click="toggleModal">HOW TO PLAY</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background-container {
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background-color: white;
}

.spinning-background {
    position: fixed; 
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-image: url('../images/logo2.avif');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0; 
    animation: spin 30s linear infinite;
    background-color: white;
}

.content {
    position: relative;
    z-index: 1; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 1rem;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.button-container {
    display: flex;
    flex-direction: column; 
    align-items: center;    
    gap: 0.625rem;              
}

#logOut {
    position: absolute; 
    top: 1rem; 
    left: 1rem; 
    margin: 0; 
    font-weight: 600;
    font-size: 1.25rem;
}
</style>

<script setup>
import modal from '../components/modal.vue'
</script>

<script>
export default {
data() {
  return {
    showModal: false
  }
},
methods: {
  togglePlay() {
    this.$router.push('/play');
  },
  logOut() {
    this.$router.push('/login');
  }, 
  toggleModal() { 
    this.showModal=!this.showModal; 
  }
}
}
</script>
