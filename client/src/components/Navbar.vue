<script setup>
import axios from '@/libs/axios';
import { RouterLink, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUsersStore } from '@/stores/users.store';
import { useAuthStore } from '../stores/auth.store';

const authStore = useAuthStore();
const router = useRouter();
const usersStore = useUsersStore();
const { users, user } = storeToRefs(usersStore);
console.log(users, user);
const logout = async () => {
  try {
    console.log(users);
    return;
    await axios.delete('/api/auth/logout', { withCredentials: true });
    await router.push('/login');
  } catch (err) {
    console.error(err);
  }
};
</script>

<template>
  <header>
    <RouterLink to="/login" v-if="!users">Login</RouterLink>
    <RouterLink to="/register" v-if="!users">Register</RouterLink>
    <button @click="authStore.logout()" v-else>Logout</button>
  </header>
</template>
