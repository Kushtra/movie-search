<script>
import axios from 'axios';
import { onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
export default {
  name: 'Movie',
  setup() {
    const router = useRouter();
    onMounted(async () => {
      try {
        const { data } = await axios.get('/api/user/me');
        if (!data) throw Error;
      } catch (err) {
        await router.push('/');
      }
    });

    return {};
  }
};
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
    <h1>MOVIES</h1>
  </div>
</template>
