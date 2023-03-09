<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Pages, getImageUrl } from '@/constants';
import Rating from './Rating.vue';
import { apiUpdateRating, apiUpdateWatched, apiUpdateWatchLater, apiUpdateReview } from './uma.api';

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
  poster: String,
  description: String,
  userMovieActions: Array
});
const router = useRouter();
const posterPath = getImageUrl(props.poster, props.size);
const propsUma = props.userMovieActions.length > 0 ? props.userMovieActions[0] : {};
const uma = ref({
  rating: propsUma.rating || 0,
  review: propsUma.review || '',
  watchLater: !!propsUma.watchLater,
  watched: !!propsUma.watched
});
const updateRating = async newRating => (uma.value.rating = await apiUpdateRating(props.id, uma.value.rating, newRating));
const updateWatchLater = async () => (uma.value.watchLater = await apiUpdateWatchLater(props.id, !uma.value.watchLater));
const updateWatched = async () => (uma.value.watched = await apiUpdateWatched(props.id, !uma.value.watched));
const updateReview = async newReview => (uma.value.review = await apiUpdateReview(props.id, uma.value.review, newReview));
const goToMovie = () => router.push(Pages.movie(props.id));
</script>

<template>
  <div class="movieCard">
    <img :src="posterPath" @click="goToMovie" />
    <h4>{{ title }} ({{ released.split('-')[0] }})</h4>
    <p>{{ description }}</p>
    <div class="actions">
      <span class="material-icons" aria-label="watch later" :style="uma.watchLater && 'color: purple'" @click="updateWatchLater"
        >watch_later</span
      >
      <span class="material-icons-outlined" aria-label="watched" :style="uma.watched && 'color: purple'" @click="updateWatched">
        done_all
      </span>
      <span class="material-icons" aria-label="write review" :style="uma.review && 'color: purple'" @click="updateReview">
        rate_review
      </span>
      <Rating :rating="uma.rating" :on-rating-change="updateRating" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.movieCard {
  position: relative;
  max-width: 36rem;
  max-height: 24rem;
  border: 2px solid red;
  margin: 0.5rem 1rem;
  display: grid;
  justify-content: center;
}

img {
  cursor: pointer;
}

.actions {
  display: flex;
  gap: 0.5rem;
  span {
    cursor: pointer;
  }
}

h4 {
  color: purple;
  margin-top: 2.5rem;
}

img {
  width: 24rem;
  height: 12rem;
  object-fit: cover;
  transition: scale 0.25s ease;
  background-color: black;
  &:hover {
    scale: 1.4;
  }
}
</style>
