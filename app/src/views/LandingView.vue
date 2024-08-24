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
        <button class="rounded-button" @click="sendMessage">SEND MESSAGE</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import modal from '../components/modal.vue'
</script>

<script>
export default {
  created() {
  },
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
      ],
      socket: null
    }
  },
  methods: {
    sendMessage() {
      this.$socket.send('Button clicked');
    },
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
.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
}

p {
  margin: 1rem 2rem;
}

@keyframes float-middle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(6px);
  }
}

@keyframes float-outer {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(3px);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.floating-button1 {
  animation: float-outer 6s infinite ease-in-out;
}

.floating-button2 {
  animation: float-middle 6s infinite ease-in-out;
}

.floating-button3 {
  animation: float-outer 6s infinite ease-in-out;
}

</style>
