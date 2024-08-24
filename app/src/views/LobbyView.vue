<template>
  <div class="purpleBackground">
    <div class="pageContainer">
      <div class="back">
        <button class="rounded-button" @click="toggleBack">Back</button>
      </div>
      <div class="welcome">
        <h2>Lobby</h2>
        <h4>Your room code is </h4>
        <h4 class="roomCode">{{ $gameStore.code }}</h4>
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
export default {
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
      pollUsers: null, 
      pollGame: null,
      gameStatus: null
    };
  },
  async created() {
    const imageOptions = await Promise.all(this.images);
    this.randomImage = imageOptions[Math.floor(Math.random() * imageOptions.length)].default;

    this.$socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.$socket.on('new_player_joined', () => {
      console.log('New player joined room:');
      this.listPlayers();
    });

    this.$socket.on('error', (data) => {
      console.error('Socket error:', data.message);
    });

    this.joinGameSocket();
  },
  beforeUnmount() {
    clearInterval(this.pollUsers);
    clearInterval(this.pollGame);
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
    gameStatus() {
      if (this.gameStatus === 'CLUE_GIVING') {
        this.$router.push('/clue')
      }
    },
  },
  methods: {
    joinGameSocket() {
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
    playerRefresh() {
      return setInterval(this.listPlayers, 1000);
    },
    async goToClues() {
      try {
        const response = await this.$axios.put(`/game/${this.$gameStore.game.id}/start`);
        if (response.status !== 200) {
          alert('Failed to start game');
        } else {
          this.$router.push('/clue');
        }
      } catch (e) {
        alert('Failed to start game');
        console.log(e);
      }
    },
    async getGame() {
      try {
        const data = await this.$gameStore.getGame();
        this.gameStatus = data.status;
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
  margin-top: 2rem;
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

</style>
