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
      <div class="button-group">
        <button v-if="!showNameField" class="rounded-button" type="button" @click="toggleCreateAccount">Create Account</button>
        <button class="rounded-button" type="submit">
          {{ showNameField ? 'Create Account' : 'Login' }}
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
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; 
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
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
}

.button-group button {
  margin: 0.5rem;
  cursor: pointer; 
}

.rounded-button {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 1.4rem;
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
