import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const pinia = createPinia()
pinia.use(piniaPersist)

const app = createApp(App)
app.use(pinia)

import { userStore } from '@/stores/user.js'
import { gameStore } from '@/stores/game.js'
import { loadingStore } from './stores/loading'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

app.use(router);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$userStore = userStore();
app.config.globalProperties.$gameStore = gameStore();
app.config.globalProperties.$loading = loadingStore();

app.mount('#app');
