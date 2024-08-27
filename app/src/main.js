import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useToast } from 'vue-toastification'

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
app.config.globalProperties.$toast = useToast();

const toast = useToast(); 
const errorToast = (message) => toast.error(message, {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
})
const successToast = (message) => toast.success(message, {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
})
const infoToast = (message) => toast.info(message, {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
})

app.config.globalProperties.$error= errorToast;
app.config.globalProperties.$success= successToast;
app.config.globalProperties.$info= infoToast;

app.config.globalProperties.$badRequest = (axioserror) => { 
  const status = axioserror?.response?.status || 500 
  const message = axioserror?.response?.data?.message || 'Something went wrong...'
  console.log(axioserror)
  if (status > 499 ){ 
    errorToast('Server Error');
  } 
  if (status < 500 && status > 399) { 
    errorToast(message);
  }
}

app.config.globalProperties.$goodRequest = (axiosmessage) => { 
  const status = axiosmessage?.response?.status || 200 
  const message = axiosmessage?.response?.data?.message || 'Success!'
  console.log(axiosmessage)
  if (status > 199 && status > 300){ 
    successToast('Success!');
  } 
}

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