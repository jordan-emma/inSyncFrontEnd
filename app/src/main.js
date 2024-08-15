import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import router from './router'
import axios from 'axios'
const app = createApp(App)
import { userStore } from '@/stores/user.js'
import { gameStore } from '@/stores/game.js'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

app.use(router);
app.use(createPinia());

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$userStore = userStore();
app.config.globalProperties.$gameStore = gameStore();


app.mount('#app');
