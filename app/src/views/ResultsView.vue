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
      clueObject: {},
      modalBlocks: [ 
        {
          title: '',
          body: 'This is Place Holder for clue 1',
          slider1: 'This is where the frst slider will go ',
          slider2: 'This is where the second slider will go',
          pointsAwarded: 'This is where the points earned will go'
        }, 
        {
          title: 'Clue',
          body: 'This is Place Holder for clue 2',
          slider1: 'This is where the frst slider will go ',
          slider2: 'This is where the second slider will go',
          pointsAwarded: 'This is where the points earned will go'
        }, 
      ],
    }
  },
  methods: { 
    setBlocks() { 
      let game_id=this.$gameStore.id;
      let clues=this.$clueStore.getCluesForGame(game_id);
      return clues.map((clue) => { 
        return {
          title: 'Clue', 
          body: clue.prompt, 
          slider1: { 
            max_value: clue.max_value, 
            low_value: clue.low, 
            guess_value: clue.guess_value
          }, 
          slider2: { 
            max_value: clue.max_value, 
            low_value: clue.low, 
            target_value: clue.value, 
          }, 
        }
      })
    }
  }, 
  created() { 
    this.clueObject = this.setBlocks(); 
    console.log(this.clueObject); 
  },
}

</script>

<style scoped>

</style>
