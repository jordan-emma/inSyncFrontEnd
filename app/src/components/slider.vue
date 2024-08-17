<template>
    <input
      type="range"
      :min="min"
      :max="max"
      :value="modelValue"
      @input="updateValue"
      :disabled="disabled" 
    />
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
      },
      disabled: { 
        type: Boolean,
        default: false
      }
    },
    methods: {
      updateValue(event) {
        if (!this.disabled) {
          this.$emit('update:modelValue', Number(event.target.value));
        }
      }
    }
  }
  </script>
  
  
<style>

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  width: 100%; 
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
  height:5em;
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

.purpleBackground{
    margin: 0;
    padding: 0;
    align-items: center;
    justify-content: center;
    justify-items: center;
    justify-content: center; 
}

.slider-wrapper h4 {
  margin: 0; 
  padding: 0 1em; 
  color: white;
  font-weight: 500;
  font-size: 1.5em;
}

 .slider-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between; 
  width: 80vw; 
  max-width: 100vw; 
  padding: 0 1rem; 
  padding-bottom: 2em; 
  margin-bottom: 2em; 
} 

.slider-wrapper p {
  margin: 0;
  padding: 0 1em; 
  color: white;
  font-weight: 500;
  font-size: 1.5em; 
}

@media (max-width: 600px) {
  .slider-wrapper {
    width: 90%; 
  }

  .slider-wrapper h4 {
    font-size: 1em; 
  }
} 


@media (min-width: 768px) {
  .slider-wrapper {
    width: 80vw; 
  }
}

@media (min-width: 1200px) {
  .slider-wrapper {
    width: 60vw; 
  }
}

@media (max-width: 430px){
  input[type="range"]::-webkit-slider-thumb {
    height: 8vw; 
    width: 8vw;
  }
}
</style>




