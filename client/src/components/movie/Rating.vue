<script setup>
const props = defineProps({
  rating: {
    type: Number,
    default: 0
  },
  onRatingChange: {
    type: Function,
    default: rating => {}
  },
  maxRating: {
    type: Number,
    default: 10
  }
});
</script>

<template>
  <div aria-label="star rating">
    <span v-for="i in maxRating" @click="onRatingChange(i)" class="material-icons">
      {{ rating >= i ? 'star' : 'star_outline' }}
    </span>
  </div>
</template>

<style scoped>
span {
  color: #d9c619;
  cursor: pointer;
}
</style>
