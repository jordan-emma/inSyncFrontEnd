<template>
  <div class="background-container" >
    <modal :show="showModal"  :header="modalTitle" :blocks="modalBlocks" @close="toggleModal" />
    <div class="spinning-background"></div>
    <div class="content">
      <button class="rounded-button" id="logOut" @click="logOut">Log Out</button>
      <div class="logo">
        <img src="../images/insyncLogo.png">
      </div>
      <p class="welcome">Hi, {{ $userStore.name }}!</p>
      <div class="button-container">
        <button class="rounded-button" @click="togglePlay">PLAY</button>
        <button class="rounded-button" @click="toggleModal">HOW TO PLAY</button>
        <button class="rounded-button">SETTINGS</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import modal from '../components/modal.vue'
</script>

<script>
export default {
  data() {
    return {
      showModal: false,
      modalTitle: 'Team up with your <br> crew to spin the dial and hit <br> the hidden bullseye!', 
      modalBlocks: [
        {
          title: 'The Catch', 
          body:'The target is sneaky—it’s hiding in a new spot each round, and you’ll have to guess where it is.'
        }, 
        {
          title: 'The Perk',
          body: 'One of your teammates has a special power—they know exactly where the target is! But there’s a twist: they can only drop a hint using a scale between two opposite ideas. Imagine a spectrum from “Sweet to Sour.” If the target is leaning towards “Sweet,” the clue might be something like “honey”—sweet, but not sugar-overload sweet.'
        }, 
        {
          title: 'Clue Time', 
          body: 'Every round, a new teammate gives the clue, and the rest of you get to chat, debate, and strategize while the clue giver stays as cool as a cucumber.'
        }, 
        { 
          title: 'The Reveal',
          body: 'When you’re all set, everyone taps “Ready,” and the big reveal happens—where’s the target?'
        }, 
        {
          title: 'Scoring', 
          body: 'The closer you are to the center, the more points you rack up!'
        }, 
        {
          title: 'Teamwork', 
          body: 'And remember, it’s all about teamwork—either you all win together, or you face the challenge again. Let the fun begin!'
        }
      ]
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

<style scoped>
.background-container {
    position: relative;
    height: 100vh;
    width: 100vw;
    background-color: white;
}

.spinning-background {
    position: fixed; 
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-image: url('../images/background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0; 
    /* animation: spin 30s linear infinite; */
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

/* @keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
} */

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

p {
  margin: 1rem 2rem;
}

</style>
