<template>
  <div v-if="show" class="message-container">
    <div class="message-content">
      <img :src="messageIcon" alt="Message Icon" class="message-icon" />
      <p class="message-text">{{ messageText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    messageText: {
      type: String,
      default: ''
    },
    messageIcon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.message-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 300px;
  margin: 0.5rem auto;
  padding: 1rem;
  box-sizing: border-box;
}

.message-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  position: relative;
  margin-bottom: 1rem;
}

.message-icon {
  margin-right: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
}

.message-text {
  color: #47037e;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
  padding: 0.5rem;
}

</style>
