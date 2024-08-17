<template>
    <div class="slider-container">
      <input 
        type="range" 
        :min="min" 
        :max="max" 
        :value="modelValue" 
        @input="updateValue"
      />
    </div>
  </template>
  
  <script>
  export default {
    name: 'Slider',
    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      modelValue: {
        type: Number,
        default: 0
      }
    },
    methods: {
      updateValue(event) {
        this.$emit('update:modelValue', Number(event.target.value));
      }
    }
  }
  </script>
  
  <style scoped>
.slider-container {
  position: relative;
  padding: 0;
  height: 9vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  overflow: hidden;
  height: 9vh;
  width: 30vw; 
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  width: 100vw; 
  background-color: transparent;
}

input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  background: linear-gradient(
    to right,
    white 0%,
    #84369c 100% 
  );
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 5em;
  width: 5em; 
  background: url("../images/cutestar3.png") center no-repeat;
  background-size: cover; 
  cursor: grab;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

body, html {
  margin: 0;
  padding: 0;
}

@media (max-width: 600px) {
  .slider-container {
    width: 80vw; 
    align-items: center;
  }
}

.purpleBackground{
    margin: 0;
    padding: 0;
    align-items: center;
    justify-content: center;
    justify-items: center;
    justify-content: center; 
}

.slider-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between; 
  width: 40vw; 
}

.slider-wrapper h4 {
  margin: 0; 
  padding: 0 1em; 
  color: white;
  font-weight: 500;
  font-size: 1.5em;
}


</style>
