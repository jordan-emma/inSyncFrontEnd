<template>
  <div class="purpleBackground">
    <div class="pageContainer">
      <div class="back">
        <button class="rounded-button" @click="toggleBack">Back</button>
      </div>
      <div class="welcome">
        <h2>Lobby</h2>
        <div class="roomCode">
          <h4>Room Code: </h4>
          <h4 ref="message">{{ $gameStore.code }}</h4>
        </div>
        <message-alert
          :show="showAlert"
          :messageText="alertMessage"
          :messageIcon="alertIcon"
          @click="copyText()"
        />
      </div>
      <div class="profilePicture">
        <img :src="randomImage" alt="Profile Picture" class="rounded-image" />
      </div>
      <div>
        <p>Host: {{ $gameStore.hostPlayerName }}</p>
        <p>{{ playerList }}</p>
      </div>
      <div class="button-container">
        <button v-if="hosting" class="rounded-button" @click="goToClues">START GAME</button>
      </div>
    </div>
  </div>
</template> 

<script>
import MessageAlert from '@/components/MessageAlert.vue'

export default {
  components: { 
    MessageAlert
   },
  data() {
    return {
      images: [
        import('@/images/character1.jpg'),
        import('@/images/character2.jpg'),
        import('@/images/character3.jpg'),
        import('@/images/character4.jpg'),
        import('@/images/character5.jpg'),
        import('@/images/character6.jpg'),
        import('@/images/character7.jpg'),
        import('@/images/character8.jpg')
      ],
      randomImage: '',
      showAlert: true,
      alertMessage: 'Click here to copy game code!',
      alertIcon: '', 
    };
  },
  async created() {
    this.alertIcon = (await import('@/images/copyIcon.png')).default;
    const imageOptions = await Promise.all(this.images);
    this.randomImage = imageOptions[Math.floor(Math.random() * imageOptions.length)].default;
  },
  mounted() { 
    this.joinGameRoom();
    if (!$userStore.isLoggedIn){ 
      this.$router.push('/login');
    }
  },
  computed: {
    playerList() {
      const playerNames = this.$gameStore.playerNames;
      const hostName = this.$gameStore.hostPlayerName;

      const filteredPlayerNames = playerNames.filter(name => name !== hostName);

      if (filteredPlayerNames.length === 0) {
        return '';
      } else if (filteredPlayerNames.length === 1) {
        return filteredPlayerNames[0];
      } else if (filteredPlayerNames.length === 2) {
        return filteredPlayerNames.join(' and ');
      } else {
        return filteredPlayerNames.slice(0, -1).join(', ') + ', and ' + filteredPlayerNames[filteredPlayerNames.length - 1];
      }
    },
    hosting() {
      return this.$gameStore.hostPlayerId === this.$userStore.id;
    }
  },
  watch: {
    $gameStore: {
      deep: true,
      handler() {
        if (this.$gameStore.game.status === 'CLUE_GIVING') {
          this.$router.push('/clue');
        }
      }
    },
  },
  methods: {
    copyText() {
      const storage = document.createElement('textarea');
      storage.value = this.$refs.message.textContent;
      document.body.appendChild(storage);
      storage.select();
      storage.setSelectionRange(0, 99999);
      document.execCommand('copy');
      document.body.removeChild(storage);
      this.copied = true;
      this.alertMessage = 'Copied!';
    },
    joinGameRoom() {
      this.$socket.emit('join_game', {game_id: this.$gameStore.game.id, game_code: this.$gameStore.code});
    },
    toggleBack() {
      this.$router.push('/play');
    },
    async listPlayers() {
      try {
        await this.$gameStore.getPlayers();
      } catch (e) {
        console.log(e);
      }
    },
    async goToClues() {
      try {
        this.$loading.yes();
        const response = await this.$axios.post(`/game/${this.$gameStore.game.id}/start`);
        if (response.status !== 200) {
          alert('Failed to start game');
        } else {
          this.$router.push('/clue');
        }
      } catch (e) {
        alert('Failed to start game');
        console.log(e);
      } finally {
        this.$loading.no();
      }
    },
    async getGame() {
      try {
        await this.$gameStore.getGame();
      } catch (e) {
        console.log(e);
      }
    }
  },
}
</script>

<style scoped>
.profilePicture {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rounded-image {
  border-radius: 50%;
  width: 7.8125rem;
  height: 7.8125rem;
  object-fit: cover;
  border: 5px solid white;
  margin-bottom: 1em;
}

h2, h4 {
  color: white;
  text-align: center;
}

p {
  margin-bottom: 2em;
  margin-top: 0.6rem;
  font-size: 1.7rem;
  font-weight: 700;
  color: white;
  text-align: center;
}

.roomCode {
  width: fit-content;
  margin: auto;
  display: inline-flex;
}

.roomCode h4:first-child {
  margin-right: 0.5em;
}

img{
  width: 50px;
  height: auto;
}

.welcome{
  padding: 0;
  display: flex;
  flex-direction: column;
}

@media (max-width: 600px) {
  .welcome {
    font-size: 1.8em; 
    padding-top: 0;
  }
  h2{
    margin: 0 auto;
  }
  h4{
    margin: 0 auto;
    padding: 1em;
  }
  .roomCode{
    padding: 0;
  }
  .rounded-image{
    width: 5.8125rem;
    height: 5.8125rem;
  }
  .rounded-button{ 
    padding: 0.5rem;
  }
  p{ 
    margin: 0.5em;

  } 
}

@media (width: 1024px) and (height: 600px) {
  .pageContainer {
    height: fit-content;
    display: flex;
  }
  .welcome {
    display: flex;
  }
  .buttonContainer{
    display: flex;
  }
  .profilePicture{
    display: flex;
  }
  p{
    display: flex;
    margin-bottom: 0.5em;
  }
  h2{
    margin-top: 1em;
    margin-bottom: 0.5em;
  }
  .rounded-image{
    height: 5.8125rem;
    width: 5.8125rem;
    margin: 0;
  }
  .rounded-button{
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }
}

</style>
