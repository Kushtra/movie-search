<script setup>
import axios from '@/libs/axios';
import { ref } from 'vue';
import Rating from './Rating.vue';

const props = defineProps({
  id: Number,
  title: {
    type: String,
    default: 'Movie'
  },
  size: Number,
  released: {
    type: String,
    default: '1555-01-01'
  },
  rating: {
    type: Number,
    default: 0
  },
  watchLater: {
    type: Boolean,
    default: false
  },
  watched: {
    type: Boolean,
    default: false
  },
  review: {
    type: String,
    default: ''
  },
  poster: String,
  description: String
});
const posterPath = props.size
  ? `https://image.tmdb.org/t/p/w${props.size}${props.poster}`
  : `https://image.tmdb.org/t/p/original${props.poster}`;
const rating = ref(props.rating);
const updateRating = async newRating => {
  const oldRating = rating.value;
  rating.value = newRating;
  const { status } = await axios.put(`/api/uma/${props.id}/rating`, { rating: newRating });
  if (status !== 200) rating.value = oldRating;
};
const review = ref(props.review);
const updateReview = async newReview => {
  // await axios.put('/api/uma/review', { movieId: props.id, review: newReview });
};
const watched = ref(props.watched);
const updateWatched = async () => {
  watched.value = !watched.value;
  await axios.put(`/api/uma/${props.id}/watched`, { watched: watched.value });
};
const watchLater = ref(props.watchLater);
const updateWatchLater = async () => {
  watchLater.value = !watchLater.value;
  await axios.put(`/api/uma/${props.id}/watchLater`, { watchLater: watchLater.value });
};
</script>

<template>
  <div class="movieCard">
    <img :src="posterPath" />
    <h4>{{ title }} ({{ released.split('-')[0] }})</h4>
    <div class="actions">
      <span class="material-icons" aria-label="watch later" :style="watchLater && 'color: purple'" @click="updateWatchLater"
        >watch_later</span
      >
      <span class="material-icons-outlined" aria-label="watched" :style="watched && 'color: purple'" @click="updateWatched">
        done_all
      </span>
      <span class="material-icons" aria-label="write review" :style="review && 'color: purple'" @click="updateReview">
        rate_review
      </span>
      <Rating :rating="rating" :on-rating-change="updateRating" />
    </div>
    <p>{{ description }}</p>
  </div>
</template>

<style lang="scss" scoped>
.movieCard {
  position: relative;
  max-width: 36em;
  max-height: 24em;
  border: 2px solid red;
  margin: 0.5em 1em;
  display: grid;
  justify-content: center;
}

.actions {
  display: flex;
  gap: 0.5em;
  span {
    cursor: pointer;
  }
}

h4 {
  color: purple;
  margin-top: 3em;
}

img {
  width: 24em;
  height: 12em;
  object-fit: cover;
  transition: scale 0.25s ease;
  background-color: black;
  &:hover {
    scale: 1.4;
  }
}
</style>
