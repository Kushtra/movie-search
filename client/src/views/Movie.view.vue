<script setup>
import axios from '@/libs/axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Rating from '../components/movie/Rating.vue';
import { getImageUrl } from '@/constants';

const route = useRoute();
const movie = ref({});
const uma = ref({
  rating: 0
});
onMounted(async () => {
  try {
    const { data } = await axios.get(`/api/movie/${route.params.movieId}`);
    console.log(data);
    movie.value = data;
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <div class="base">
    <div class="left">
      <h1>{{ movie.title }} ({{ movie.releaseDate?.split('-')[0] }})</h1>
      <p>{{ movie.description }}</p>
      <div class="actions">
        <button>
          <span class="material-icons">watch_later</span>
        </button>
        <button>
          <span class="material-icons">watch_later</span>
        </button>
        <button>
          <span class="material-icons">done_all</span>
        </button>
        <Rating :rating="uma.rating" :onRatingChange="newRating => (uma.rating = newRating)" />
      </div>
    </div>
    <div class="right">
      <img :src="getImageUrl(movie.posterPath, 500)" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base {
  width: 100%;
  padding: 2rem;
  font-size: 1.25rem;
  display: flex;
}

.left {
  width: 40%;
  h1 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-bottom: 0.5rem;
  }
}

.right {
  width: 60%;
  img {
    float: right;
  }
}

.actions {
  display: flex;
}
</style>
