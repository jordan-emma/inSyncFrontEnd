<template>
  <div class="background">
  <div class="container">
    <div class="name">
      <h1>Insync</h1>
    </div>
    <form name="loginForm" @reset="resetFields">
      <div class="form-group" v-show="showNameField">
        <label for="name">Name:</label>
        <input id="name" type="text" v-model="name" />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" type="text" v-model="email"/>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="password"/>
      </div>
      <div class="form-group" v-show="showConfirmPasswordField">
        <label for="confirmPassword">Confirm Password:</label>
        <input id="confirmPassword" type="password" v-model="confirmPassword"/>
      </div>
      <div class="button-group">
        <button v-if="!showNameField" class="rounded-button" type="button" @click="toggleCreateAccount">Create Account</button>
        <button class="rounded-button" type="submit">
          {{ showNameField && showConfirmPasswordField ? 'Create Account' : 'Login' }}
        </button>
        <button class="rounded-button" type="reset">Reset</button>
        <button v-if="showNameField" class="rounded-button" type="button" @click="showNameField = false">Login</button>
      </div>
    </form>
  </div>
  </div>
</template>


<style>
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

.rounded-button {
  padding: 0.75rem 1.5rem;
  font-size: 1.4rem;
  border-radius: 0.5rem;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  height: 4rem; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  text-align: center; 
}

.rounded-button:hover {
  background-color: white; 
  color: black; 
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
</style>



<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      showNameField: false,
      showConfirmPasswordField: false,
    }
  },
  methods: {
    resetFields() {
      this.name = '';
      this.email = ''; 
      this.password = '';
      this.confirmPassword ='';
    },
    toggleCreateAccount() {
      this.showNameField = true;
      this.showConfirmPasswordField = true;
      this.resetFields();
    }
  }
}
</script>
