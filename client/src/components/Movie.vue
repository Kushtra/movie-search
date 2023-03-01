<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: String,
  size: {
    type: Number,
    default: 500
  },
  released: String,
  poster: String,
  description: String
});
const posterPath = `https://image.tmdb.org/t/p/w${props.size}${props.poster}`;
const overview = ref(true);
const toggle = () => (overview = !overview);
</script>

<template>
  <div class="movieCard">
    <h4>{{ title }} ({{ released.split('-')[0] }})</h4>
    <picture>
      <img v-if="overview" @click="toggle()" :src="posterPath" />
      <p v-else @click="toggle">{{ description }}</p>
      <p @click="toggle"></p>
    </picture>
  </div>
</template>

<style lang="scss" scoped>
.movieCard {
  width: 30em;
  height: 15em;
  overflow: hidden;
}
div {
  margin: 0.5em 1em;
}
h4 {
  color: purple;
}
picture {
  cursor: pointer;
}
</style>
