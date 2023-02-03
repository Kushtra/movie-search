<script setup>
import { RouterLink } from 'vue-router';
defineProps({
  msg: {
    type: String,
    default: 'hello'
  }
});
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
    <h1>{{ msg }}</h1>
  </div>
</template>
