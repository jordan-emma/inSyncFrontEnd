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
          <input id="email" type="text" v-model.trim="email"/>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input id="password" type="password" v-model.trim="password"/>
        </div>
        <div class="form-group" v-show="showSignUpField">
          <label for="confirmPassword">Confirm Password:</label>
          <input id="confirmPassword" type="password" v-model.trim="confirmPassword"/>
          <p v-if="!passwordsMatch && showSignUpField" class="error-message">Passwords do not match</p>
        </div>
        <div class="button-group">
          <button v-if="!showSignUpField" class="rounded-button" type="button" @click="toggleView('signUp')">Create Account</button>
          <button class="rounded-button" :disabled="!isFormValid" type="submit">
            {{ showSignUpField ? 'Create Account' : 'Login' }}
          </button>
          <button class="rounded-button" type="reset">Reset</button>
          <button v-if="showSignUpField" class="rounded-button" type="button" @click="toggleView('login')">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>


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

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  margin-bottom: 1rem;
  width: 100%;
  max-width: 300px;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 1rem;
  border-radius: 0.5rem;
}

.form-group label {
  color: #000;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  border: 1px solid #ddd; 
  border-radius: 0.5rem; 
  padding: 0.5rem; 
  outline: none; 
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



<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      showSignUpField: false,
    }
  },
  computed: {
  passwordsMatch() {
    return this.password === this.confirmPassword;
  },
  isFormValid() {
    if (!this.showSignUpField) {
      return true; 
    }
    const isValid = this.name.trim() !== '' &&
                    this.email.trim() !== '' &&
                    this.password.trim() !== '' &&
                    this.confirmPassword.trim() !== '';
    const passwordsMatch = this.passwordsMatch;
    return isValid && passwordsMatch;
  }
},
  methods: {
    resetFields() {
      this.name = '';
      this.email = ''; 
      this.password = '';
      this.confirmPassword = '';
    },
    toggleView(view) {
      this.showSignUpField = (view === 'signUp');
      this.resetFields();
    },
    handleSubmit() {
      if (this.isFormValid) {
        alert('Form submitted!');
      }
    }
  }
}
</script>
