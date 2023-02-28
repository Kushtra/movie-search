<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
  <div>
    <h1>MOVIES</h1>
    <h4 v-if="user">Hello {{ user }}</h4>
  </div>
</template>
