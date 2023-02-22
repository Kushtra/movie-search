<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth.store';
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
console.log(user);
</script>

<template>
  <div>
    <h1>MOVIES</h1>
    <h4 v-if="user">Hello {{ JSON.stringify(user) }}</h4>
  </div>
</template>
