<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import { Pages } from '@/constants';

const router = useRouter();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
  <header>
    <h3>Movie Engine</h3>
    <RouterLink v-if="!user" :to="Pages.login">Login</RouterLink>
    <RouterLink v-if="!user" :to="Pages.register">Register</RouterLink>
    <button v-else @click="authStore.logout(router)">Logout</button>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 0.5em 1.5em;
  background-color: purple;
}

h3 {
  color: white;
}
</style>
