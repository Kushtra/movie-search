<script>
import axios from '@/libs/axios';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
export default {
  name: 'Movie',
  setup() {
    // temp route guard
    const router = useRouter();
    onMounted(async () => {
      try {
        const { data } = await axios.get('/api/user/me', { withCredentials: false });
        if (!data) throw Error;
      } catch (err) {
        await router.push('/login');
      }
    });

    return {};
  }
};
</script>

<template>
  <div>
    <h1>MOVIES</h1>
  </div>
</template>
