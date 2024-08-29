import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useToast } from 'vue-toastification'

const toast = useToast();

export const errorToast = (message) => toast.error(message, {
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
});

export const successToast = (message) => toast.success(message, {
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
});

export const infoToast = (message) => toast.info(message, {
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
});

export const goodRequest = (axiosmessage) => {
  const status = axiosmessage?.response?.status || 200
  const message = axiosmessage?.response?.data?.message || 'Success!'
  if (status > 199 && status > 300){
    successToast(message);
  }
}

export const badRequest = (axioserror) => {
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

export { Toast };
