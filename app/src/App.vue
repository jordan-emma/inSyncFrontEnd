<script setup>
import { RouterView } from 'vue-router'

import { userStore } from '@/stores/user.js';
import { gameStore } from '@/stores/game.js';
import { loadingStore } from '@/stores/loading.js';
import axios from 'axios'

// Initialize stores
const user = userStore();
if(user.token){
  axios.defaults.headers.common['Authorization'] = user.token
}
const game = gameStore();
const loading = loadingStore();

</script>


<template>
  <RouterView />
</template>

