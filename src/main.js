import './assets/main.css'
import {
  infoToast,
  successToast,
  errorToast,
  Toast,
  goodRequest,
  badRequest
} from './js/toast.js'

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
import { clueStore } from './stores/clue.js'
import { io } from 'socket.io-client'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

app.use(router);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$userStore = userStore();
app.config.globalProperties.$gameStore = gameStore();
app.config.globalProperties.$loading = loadingStore();
app.config.globalProperties.$clueStore = clueStore();
app.config.globalProperties.$error= errorToast;
app.config.globalProperties.$success= successToast;
app.config.globalProperties.$info= infoToast;
app.config.globalProperties.$goodRequest = goodRequest;
app.config.globalProperties.$badRequest = badRequest;

const socket = io.connect('http://localhost:5000');
function connectSocket(socket) {
  return new Promise((resolve, reject) => {
    if (socket.connected) {
      console.log("Connected: ", this.$socket.connected);
      resolve();
    } else {
      socket.on('connect', () => {
        resolve();
      });

      socket.on('connect_error', (error) => {
        reject(error);
      });
    }
  });
}

app.config.globalProperties.$socket = socket;
app.config.globalProperties.$connectSocket = connectSocket;

app.use(Toast, {});
app.mount('#app');
