<template>
  <div class="background">
    <div class="container">
      <div class="name">
        <h1>Insync</h1>
      </div>
      <form name="loginForm" @reset="resetFields" @submit.prevent="handleSubmit">
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
        <p v-if="!showSignUpField && !isFormValid" class="error-message">Please enter email and password</p>
        <div class="button-group">
          <button v-if="!showSignUpField" class="rounded-button" type="button" @click="toggleView('signUp')">Create
            Account
          </button>
          <button class="rounded-button" :disabled="!isFormValid" type="submit">
            {{ showSignUpField ? 'Create Account' : 'Login' }}
          </button>
          <button class="rounded-button" type="reset">Reset</button>
          <button v-if="showSignUpField" class="rounded-button" type="button" @click="toggleView('login')">Login
          </button>
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
      showSignUpField: false
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
        if (this.showSignUpField){
          await  this.$userStore.signUp(this.name, this.email, this.password, this.confirm_password)
        } else {
            await this.$userStore.login(this.email, this.password)
        }
        this.$router.push('/landing')
      } catch (error) {
        // todo set error message
        console.error(error)
      }
    }
  }
}

</script>

<style scoped>
.background {
  background-image: url('../images/logo2.avif');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: white;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
}

.name {
  margin-bottom: 2rem;
}

.button-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
  gap: 0.5rem;
}

@media (max-width: 600px) {
  .button-group {
    flex-direction: column;
    align-items: center;
  }

  .background {
    background-size: cover;
  }
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}
</style>
