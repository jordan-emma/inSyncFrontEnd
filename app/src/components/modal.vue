<template>
  <div class="container" v-if="show" @click="close">
    <div class="content">
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
  height: 50vh; 
  width: 60vw;
  background-color: white;
  border-radius: 6rem;
  box-shadow:
    -10px 10px 20px 5px rgba(255, 105, 180, 0.6), 
    -15px 15px 30px 10px rgba(255, 165, 0, 0.6), 
    -20px 20px 40px 15px rgba(255, 255, 0, 0.6), 
    -25px 25px 50px 20px rgba(0, 255, 0, 0.6),
    -30px 30px 60px 25px rgba(0, 191, 255, 0.7), 
    -35px 35px 70px 30px rgba(255, 20, 147, 0.6); 
  font-family: 'Comic Sans MS', cursive, sans-serif; 
  font-size: 0.98rem; 
  overflow-y: auto;
  padding-bottom: 2em; 
}

</style>