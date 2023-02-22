<script>
import { RouterLink, useRouter } from 'vue-router';
import axios from '@/libs/axios';
const user = false;

export default {
  setup() {
    const router = useRouter();
    const logout = async () => {
      try {
        await axios.delete('/api/auth/logout', { withCredentials: true });
        await router.push('/login');
      } catch (err) {
        console.error(err);
      }
    };
    return { logout };
  },
  data() {
    return {
      user: true
    };
  }
};
</script>

<template>
  <header>
    <RouterLink to="/login" v-if="!user">Login</RouterLink>
    <RouterLink to="/register" v-if="!user">Register</RouterLink>
    <button @click="logout" v-else>Log out</button>
  </header>
</template>
