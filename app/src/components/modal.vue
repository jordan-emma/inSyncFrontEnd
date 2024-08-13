<template>
  <div class ="container" v-if="show" @click="close">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

.container{
  height: 100vh; 
  width: 100vw;
  z-index: 100;
  background-color: rgba(94, 94, 94, 0.5);
  position: absolute; 
}

.content{
  height: 40vh; 
  width: 40vw;
  background-color: white;
}

</style>

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