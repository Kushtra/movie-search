<script setup>
import axios from '@/libs/axios';
import Movie from '@/components/movie/Movie.vue';
import { onMounted, ref } from 'vue';
const movies = ref([]);
onMounted(async () => {
  try {
    const { data } = await axios.get('/api/movie');
    // movies.value = [data[0]];
    movies.value = data;
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <div class="movieList">
    <Movie
      v-for="{ id, title, releaseDate, description, backdropPath, userMovieActions } in movies"
      :key="id"
      :id="id"
      :title="title"
      :poster="backdropPath"
      :released="releaseDate"
      :description="description"
      :userMovieActions="userMovieActions"
    />
  </div>
</template>

<style>
.movieList {
  background-color: #ddd;
  max-width: 100vw;
  overflow: hidden;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
  padding: 2rem 4rem;
}
</style>
