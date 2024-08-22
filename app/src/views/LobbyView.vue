<template>
  <div class="purpleBackground">
  <div class="container">
    <div class="back">
      <button class="rounded-button" @click="toggleBack">Back</button>
    </div>
    <div class="welcome">
      <h2>Lobby</h2>
      <h4>Your room code is {{ $gameStore.code }}</h4>
    </div>
    <div class="profilePicture">
      <img :src="randomImage" alt="Profile Picture" class="rounded-image"/>
    </div>
    <div>
      <p> Host: {{ $gameStore.hostPlayerName }}</p>
      <p> {{ playerList }} </p>
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
      pollUsers: null
    };
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
    hosting(){
      return this.$gameStore.hostPlayerId === this.$userStore.id; 
    }
  },
  methods: {
    toggleBack(){
      this.$router.push('/play');
    },
    async listPlayers(){
      try{
        let playerData = await this.$gameStore.getPlayers(); 
      }
      catch(e){
        console.log(e); 
      }
    },  
    playerRefresh(){
      return setInterval(this.listPlayers, 1000)
    },  
    async goToClues() {
      let response = await this.$axios.put(`/game/${this.$gameStore.game.id}/start`);
      if (response.status !== 200) {
        alert('Failed to start game');
      }
      this.$router.push('/clue');
    },
  },
  async created() {
    const imageOptions = await Promise.all(this.images);
    this.randomImage = imageOptions[Math.floor(Math.random() * imageOptions.length)].default;
    this.pollUsers = this.playerRefresh();
  },
  beforeUnmount(){
    clearInterval(this.pollUsers);
  }
};

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

  h2, h4{
    color: white;
    text-align: center;
  }

  p{
    margin-bottom: 2em;
    margin-top: 0.6rem;
    font-size: 1.7rem;
    font-weight: 700; 
    color:white;
    text-align: center; 
  }

</style>
