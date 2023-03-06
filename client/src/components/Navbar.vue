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
    <RouterLink :to="Pages.login" v-if="!user">Login</RouterLink>
    <RouterLink :to="Pages.register" v-if="!user">Register</RouterLink>
    <button @click="authStore.logout(router)" v-else>Logout</button>
  </header>
</template>
