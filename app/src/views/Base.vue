<template>
    <div class="layout">
      <LoadingModal :show="$loading.loading"/>
      <router-view />
    </div>
  </template>
  
  <script>
import LoadingModal from '@/components/loadingModal.vue';

  export default {
    name: 'Layout',
    components: {
        LoadingModal
    },

  }
  </script>
  
  <style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Ensure the layout takes up full viewport height */
  }
  .footer {
    margin-top: auto; /* Push footer to the bottom */
    /* Other styling for the footer */
  }
  </style>
  