<template>
  <div class="container">
    <div class="name">
      <h1>INSYNC</h1>
    </div>
    <div class="button-container">
      <button class="rounded-button">PLAY</button>
      <button class="rounded-button">HOW TO PLAY</button>
      <button class="rounded-button"></button>
    </div>
  </div>
</template>

<style>
  body, html {
    background-color: white;
    background-image: url('..\images\logo2.avif'); 
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin: 0; 
    height: 100%; 
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center; 
    height: 100vh; 
    gap: 20px; 
  }

  .name {
    color: black;
    font-size: xx-large;
  }

  .button-container {
    display: flex;
    flex-direction: column; 
    align-items: center;    
    gap: 10px;              
  }

  .rounded-button {
    background-color: black; 
    color: white;              
    border: none;             
    border-radius: 25px;       
    padding: 10px 20px;        
    font-size: 16px;           
    cursor: pointer;           
    transition: background-color 0.3s ease; 
    width: 200px;
  }

  .rounded-button:hover {
    background-color: darkgrey 
  }
</style>