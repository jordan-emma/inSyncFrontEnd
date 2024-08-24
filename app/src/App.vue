<script>
import { RouterView } from 'vue-router'
import { userStore } from '@/stores/user.js';
import { gameStore } from '@/stores/game.js';
import { loadingStore } from '@/stores/loading.js';
import axios from 'axios'
export default {
  name: 'App',
  components: {
    RouterView
  },
  data() {
    return {
      user: userStore(),
      game: gameStore(),
      loading: loadingStore()
    };
  },
  mounted() {
    if (this.user.token) {
      axios.defaults.headers.common['Authorization'] = this.user.token;
    }

    this.$socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.$socket.on('error', (data) => {
      console.error('Socket error:', data.message);
    });

    this.$socket.on('game_updated', (data) => {
      this.$gameStore.game = data;
    });
  },
}
</script>


<template>
  <RouterView />
</template>

