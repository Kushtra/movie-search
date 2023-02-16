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
        const { data } = await axios.get('/user/me');
        console.log(data);
      } catch (err) {
        await router.push('/register');
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
    <h1>{{ msg }}</h1>
  </div>
</template>
