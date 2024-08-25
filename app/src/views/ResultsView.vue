<template>
  <div class="purpleBackground">
    <div class="pageContainer">
     <ResultsModal 
     :show="true"
     :header="modalTitle"
     :blocks="modalBlocks"
     :modalHeading="modalHeading" 
     />   
    </div>
  </div>
</template>

<script>
import ResultsModal from '@/components/ResultsModal.vue';

export default {
  components: {
    ResultsModal, 
  },
  data() {
    return {
      modalTitle: 'Total Points: ',
      modalHeading: 'Results',
      modalBlocks: [ 
        {
          title: 'Clue 1',
          body: 'This is Place Holder for clue 1',
          slider1: 'This is where the frst slider will go ',
          slider2: 'This is where the second slider will go',
          pointsAwarded: 'This is where the points earned will go'
        }, 
        {
          title: 'Clue 2',
          body: 'This is Place Holder for clue 2',
          slider1: 'This is where the frst slider will go ',
          slider2: 'This is where the second slider will go',
          pointsAwarded: 'This is where the points earned will go'
        }, 
      ],
    }
  },
}

</script>

<style scoped>

</style>
