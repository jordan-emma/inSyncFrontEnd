<template>
  <div class="container">
    <div class="welcome">
      <h1>Welcome to Insync</h1>
    </div>
    <form name="loginForm" @reset="resetFields">
      <div class="form-group">
        <label for="name" v-show="showNameField">Name:</label>
        <input id="name" type="text" v-model="name" v-show="showNameField"/>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" type="text" v-model="email"/>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="password"/>
      </div>
      <div class="button-group">
        <button v-if="!showNameField" class="btn btn-outline-dark" type="button" @click="toggleCreateAccount">Create Account</button>
        <button class="btn btn-outline-dark" type="submit">
          {{ showNameField ? 'Create Account' : 'Login' }}
        </button>
        <button class="btn btn-outline-dark" type="reset">Reset</button>
        <button v-if="showNameField" class="btn btn-outline-dark" type="button" @click="showNameField = false">Login</button>
      </div>
    </form>
  </div>
</template>


<style>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  background-image: url('../images/logo2.avif'); 
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}

.welcome h1 {
  background-color: rgba(255, 255, 255, 0.3);
  color: #000;
  padding: 15px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 2em;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
  width: 100%;
  max-width: 300px;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 15px;
  border-radius: 5px;
}

.form-group label {
  color: #000;
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  box-sizing: border-box;
  font-size: 1em;
  border: 1px solid #ddd; 
  border-radius: 5px; 
  padding: 8px; 
  outline: none; 
}

.button-group {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 15px;
}

.button-group button {
  margin: 5px;
  cursor: pointer; 
}

</style>


<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      showNameField: false 
    }
  },
  methods: {
    resetFields() {
      this.name = '';
      this.email = ''; 
      this.password = '';
    },
    toggleCreateAccount() {
      this.showNameField = true;
      this.resetFields();
    }
  }
}
</script>
