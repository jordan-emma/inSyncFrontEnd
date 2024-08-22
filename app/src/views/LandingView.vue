<template>
  <div class="purpleBackground">
    <div class="pageContainer">
      <modal
        :show="showModal"
        :header="modalTitle"
        :blocks="modalBlocks"
        @close="toggleModal"
      />
      <div class="back">
        <button class="rounded-button" @click="logOut">Log Out</button>
      </div>
      <div class="logo">
        <img src="../images/insyncLogo.png" />
      </div>
      <p class="welcome">Hi, {{ $userStore.name }}!</p>
      <div class="button-container">
        <button class="rounded-button floating-button1" @click="togglePlay">PLAY</button>
        <button class="rounded-button floating-button2" @click="toggleModal">HOW TO PLAY</button>
        <button class="rounded-button floating-button3">SETTINGS</button>
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
          body: 'The target is sneaky—it’s hiding in a new spot each round, and you’ll have to guess where it is.'
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
      this.$router.push('/play')
    },
    logOut() {
      this.$router.push('/login')
    },
    toggleModal() {
      this.showModal = !this.showModal
    }
  }
}
</script>

<style scoped>
.logo {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.logo img {
  max-width: 100%;
  height: auto;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  animation: containerMovement 25s infinite ease-in-out;
}

p {
  margin: 1rem 2rem;
}

@keyframes sideToSide1 {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes sideToSide2 {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes containerMovement {
  0% {
    transform: translate(0, 0);
  }
  20% {
    transform: translate(-5px, 5px);
  }
  40% {
    transform: translate(5px, -5px);
  }
  60% {
    transform: translate(-5px, -10px);
  }
  80% {
    transform: translate(5px, 10px);
  }
  100% {
    transform: translate(0, 0);
  }
}

.floating-button1 {
  animation: sideToSide1 15s infinite ease-in-out;
}

.floating-button2 {
  animation: sideToSide2 15s infinite ease-in-out;
}

.floating-button3 {
  animation: sideToSide1 15s infinite ease-in-out;
}
</style>
