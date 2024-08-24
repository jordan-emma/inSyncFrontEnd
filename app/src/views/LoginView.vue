<template>
  <div class="purpleBackground">
    <div class="pageContainer">
      <div class="logo">
        <img src="../images/insyncLogo.png" alt="Logo" />
      </div>
      <form name="loginForm" @reset="resetFields" @submit.prevent="handleSubmit">
        <div class="inputContainer">
          <div class="form-group" v-show="showSignUpField">
            <label for="name">Name:</label>
            <input id="name" type="text" v-model.trim="name" />
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input id="email" type="text" v-model.trim="email" />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input id="password" type="password" v-model.trim="password" />
          </div>
          <div class="form-group" v-show="showSignUpField">
            <label for="confirm_password">Confirm Password:</label>
            <input id="confirm_password" type="password" v-model.trim="confirm_password" />
            <p v-if="!passwordsMatch && showSignUpField" class="error-message">Passwords do not match</p>
          </div>
          <div v-if="!showSignUpField && !isFormValid" class="error-message-container">
            <div class="error-message">
              <img src="../images/reminderIcon.png" alt="Reminder Icon" class="reminder-icon" />
              <p class="error-message-text">Don’t forget to fill in both email and password.</p>
            </div>
          </div>
        </div>
        <div class="button-container">
          <button v-if="!showSignUpField" class="rounded-button floating-button1" type="button" @click="toggleView('signUp')">Sign Up</button>
          <button class="rounded-button floating-button2" :disabled="!isFormValid" type="submit">{{ showSignUpField ? 'Sign Up' : 'Login' }}</button>
          <button v-if="!showSignUpField" class="rounded-button floating-button3" type="reset">Reset</button>
          <button v-if="showSignUpField" class="rounded-button" type="button" @click="toggleView('login')">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      showSignUpField: false, 
    }
  },
  computed: {
    passwordsMatch() {
      return this.password === this.confirm_password
    },
    isFormValid() {

      if ((this.email.trim() && !this.password.trim()) || (!this.email.trim() && this.password.trim())) {
        return false
      }
      if (!this.showSignUpField) {
        return true
      }

      const isValid = this.name.trim() && this.email.trim() && this.password.trim() && this.confirm_password.trim() != ''
      const passwordsMatch = this.passwordsMatch
      return isValid && passwordsMatch
    }
  },
  methods: {
    resetFields() {
      this.name = ''
      this.email = ''
      this.password = ''
      this.confirm_password = ''
    },
    toggleView(view) {
      this.showSignUpField = (view === 'signUp')
      this.resetFields()
    },
    async handleSubmit() {
      if (!this.isFormValid) {
        return // todo set error message
      }
      try{
        this.$loading.yes();
        if (this.showSignUpField){
          await  this.$userStore.signUp(this.name, this.email, this.password, this.confirm_password)
        } else {
            await this.$userStore.login(this.email, this.password)
        }
        this.$router.push('/landing')
      } catch (e) {
        // todo set error message
        console.log(e);
      }
      finally{
        this.$loading.no(); 
      }
    }
  }
}

</script>

<style scoped>
.error-message-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 300px;
  margin-top: 0.5rem;
}

.error-message {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  position: relative;
  margin-bottom: 1rem;
}

.reminder-icon {
  position: absolute;
  left: 1rem;
  width: 1.5rem;
  height: 1.5rem;
}

.error-message-text {
  color: #47037e;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  margin-left: 2rem; 
}

.button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem; 
  animation: containerMovement 25s infinite ease-in-out;
}

@media(max-width: 600px) {
  .button-container {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    animation: containerMovement 25s infinite ease-in-out;
    margin-top: 1rem;
  }
  .rounded-button {
    padding-bottom: 0.75rem;
    padding-top: 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
    width: 8rem;
  }
  .inputContainer{  
  overflow-y: scroll;
  width: 100%;
}
form{
  width: 100%;
}
}

@media(max-height: 376px ) {
  .button-container {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    animation: containerMovement 25s infinite ease-in-out;
    margin-top: 1rem;
  }
  .rounded-button {
    padding-bottom: 0.75rem;
    padding-top: 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
    width: 8rem;
  }
  .inputContainer{ 
  max-height: 383px; 
  overflow-y: scroll;
  width: 100%;
}
form{
  width: 100%;
}
}

@media(max-height: 720px ) {
  .button-container {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    animation: containerMovement 25s infinite ease-in-out;
    margin-top: 1rem;
  }
  .rounded-button {
    padding-bottom: 0.75rem;
    padding-top: 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
    width: 8rem;
  }
  .inputContainer{ 
  max-height: 383px; 
  overflow-y: scroll;
  width: 100%;
}
form{
  width: 100%;
}
}

@media(max-height: 720px ) {
  .button-container {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    animation: containerMovement 25s infinite ease-in-out;
    margin-top: 1rem;
  }
  .rounded-button {
    padding-bottom: 0.75rem;
    padding-top: 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
    width: 8rem;
  }
  .inputContainer{ 
  max-height: 383px; 
  overflow-y: scroll;
  width: 100%;
}
form{
  width: 100%;
}
}

@media (max-width: 1024px) and (max-height: 600px) {
  .logo {
    width: 100%; 
    text-align: center;
    margin-bottom: 1rem; 
  }

  .button-container {
    flex-direction: row;
    align-items: center;
    gap: 0.8rem; 
    margin: 1rem;
  }

  .rounded-button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 600;
    width: 7rem;
  }

  .inputContainer {
    max-height: 300px; 
    overflow-y: auto;
    width: 100%;
    padding: 0 1rem; 
  }

  form {
    width: 90%; 
    margin: auto;
  }

}

@keyframes floating {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes floating-outer {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
}

.floating-button1 {
  animation: floating-outer 5s infinite ease-in-out;
}

.floating-button2 {
  animation: floating 5s infinite ease-in-out;
}

.floating-button3 {
  animation: floating-outer 5s infinite ease-in-out;
}

.inputContainer{
  display: flex;
  flex-direction: column;
  align-items: center;
}


</style>
