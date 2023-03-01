<script>
import Movie from '@/components/Movie.vue';
import axios from '@/libs/axios';
export default {
  components: { Movie },
  data() {
    return {
      movies: []
    };
  },
  methods: {
    async getMovies() {
      try {
        const { data, status } = await axios.get('/api/movie');
        if (status !== 200) return;
        this.movies = data;
      } catch (err) {
        console.error(err);
      }
    }
  },
  mounted() {
    this.getMovies();
  }
};
</script>

<template>
  <div class="movieList">
    <Movie
      v-for="{ title, releaseDate, posterPath, description, backdropPath } in movies"
      :title="title"
      :poster="backdropPath"
      :released="releaseDate"
      :description="description"
    />
  </div>
</template>

<style>
.movieList {
  background-color: #ddd;
  max-width: 100vw;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
