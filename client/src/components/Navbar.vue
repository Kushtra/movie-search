<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import { Pages } from '@/constants';

const router = useRouter();
const authStore = useAuthStore();
const { token } = storeToRefs(authStore);
const logout = async () => {
  await authStore.logout();
  return router.push(authStore.returnUrl || Pages.login);
};
</script>

<template>
  <header>
    <div>
      <RouterLink :to="Pages.movies">Movie Engine</RouterLink>
    </div>
    <div>
      <template v-if="!token">
        <RouterLink :to="Pages.login">Login</RouterLink>
        <RouterLink :to="Pages.register">Register</RouterLink>
      </template>
      <button v-else @click="logout">Logout</button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
  background-color: purple;
  div {
    display: flex;
    gap: 0.25rem;
  }
}

a {
  all: unset;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  padding: 0.25rem;
  border: 1px solid yellow;
  border-radius: 0.5rem;
}
</style>
