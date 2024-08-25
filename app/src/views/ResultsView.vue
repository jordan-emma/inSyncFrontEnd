<template>
  <div class="purpleBackground">
    <div class="pageContainer">
     <Modal 
     :show="true"
     :header="modalTitle"
     :blocks="modalBlocks"
     :modalHeading="modalHeading" 
     />   
    </div>
  </div>
</template>

<script>
import Modal from '@/components/modal.vue';

export default {
  components: {
    Modal, 
  },
  data() {
    return {
      modalTitle: 'Results',
      modalHeading: 'Results',
      modalBlocks: [ 
        {
          title: 'Clue 1',
          body: 'Did you know that the average person spends about 6 months of their life waiting in line for food?'
        }, 
      ],
    }
  },
}

</script>

<style scoped>

</style>
