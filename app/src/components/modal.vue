<template>
  <div class="container" v-if="show" @click="close">
    <div class="content">
      <div class="header">
        <button>
          X
        </button>
        <img src="../images/howToIcon3.png" />
        <h2>How to Play</h2>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default { 
    props: {
      show: {
        type: Boolean,
        default: false
      }
    }, 
    methods: {
      close(e){
    
        if(e.target.className === "container"){ 
          this.$emit('close'); 
        }

      }

    }
  }
</script>

<style scoped>

.container{
  height: 100vh; 
  width: 100vw;
  z-index: 100;
  background-color: rgba(94, 94, 94, 0.5);
  position: absolute; 
}

.content{
  height: 80vh; 
  max-width: 700px; 
  width: 70vw;
  background-color: white;
  border-radius: 1rem;
  box-shadow:
    -10px 10px 20px 5px rgba(29, 22, 51, 0.6);
  font-family: 'Arial', 'sans-serif';
  font-size: 0.98rem; 
  overflow-y: auto;
  padding-bottom: 2em; 
  background-color: #5f43b2; 
}

.header {
  background-color: white;
  padding: 0.5em;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  position: relative;
}

.header img {
  max-width: 50px; 
  margin-right: 1em; 
  margin-left: 1em;
}

h2 {
  margin: 0;
  font-family: 'Helvetica', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  padding-top: 1.5%;
  color:#382a5f;
}

button{
  position: absolute; 
  top: 1rem; 
  right: 1.5rem; 
  margin: 0;
  background-color: transparent;
  border: transparent;
  color: #382a5f;
  font-size: 2em;
  font-family: 
  font-weight: 400;
}



</style>