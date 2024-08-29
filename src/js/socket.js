import { io } from 'socket.io-client';

export const socket = io.connect(import.meta.env.VITE_API_BASE_URL);

export function connectSocket(socket) {
  return new Promise((resolve, reject) => {
    if (socket.connected) {
      console.log("Connected: ", socket.connected);
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
