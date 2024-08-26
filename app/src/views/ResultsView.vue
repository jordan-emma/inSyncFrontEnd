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
      modalBlocks: [],
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
          max_value: clue.max_value, 
          low_value: clue.low, 
          guess_value: clue.guess_value,
          target_value: clue.value
        }
      })
    }
  }, 
  created() { 
    this.clueObject = this.setBlocks(); 
    console.log(this.clueObject); 
    this.modalBlocks = this.setBlocks();
  },
}

</script>

<style scoped>

</style>
