<template>
  <div class="container">
    <div class="back">
      <button @click="toggleBack">Back</button>
    </div>
    <div class="name">
      <h2>Lobby</h2>
      <h4>Your room code is {{ $gameStore.code }}</h4>
    </div>
    <div class="profilePicture">
      <img :src="randomImage" alt="Profile Picture" class="rounded-image"/>
    </div>
    <div>
      <h4></h4>
    </div>
    <div class="button-container">
      <button class="rounded-button">START GAME</button>
      <button class="rounded-button" @click="listPlayers">GET PLAYERS</button>
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
      randomImage: ''
    };
  },
  methods: {
    toggleBack(){
      this.$router.push('/play');
    },
    async listPlayers(){
      console.log('Im here');
      try{
        let playerData = await this.$gameStore.getPlayers(); 
        console.log(playerData); 
      }
      catch(e){
        console.log(e); 
      }
    },    
  },
  async created() {
    const imageOptions = await Promise.all(this.images);
    this.randomImage = imageOptions[Math.floor(Math.random() * imageOptions.length)].default;
  }, 
};

</script>

<style scoped>

  .profilePicture {
    display: flex;
    justify-content: center; 
    align-items: center; 
    margin: 2rem;
  }

  .rounded-image {
    border-radius: 50%; 
    width: 7.8125rem; 
    height: 7.8125rem;
    object-fit: cover; 
    border: 5px solid #000;
  }

  .container{
    background-image: url('../images/background.jpg');
    background-size: cover; 
  }

  h2, h4{
    color: white;
  }

</style>
