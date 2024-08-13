<template>
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
