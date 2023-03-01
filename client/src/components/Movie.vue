<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: String,
  size: Number,
  released: String,
  poster: String,
  description: String
});
const posterPath = `https://image.tmdb.org/t/p/w${props.size || 500}${props.poster}`;
const overview = ref(true);
const toggle = () => {
  overview.value = !overview.value;
};
</script>

<template>
  <div class="movieCard">
    <h4>{{ title }} ({{ released.split('-')[0] }})</h4>
    <picture>
      <img v-if="overview" @click="toggle()" :src="posterPath" />
      <p v-else @click="toggle()">{{ description }}</p>
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
