<script setup>
import { axios } from '@/libs/axios';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Pages } from '@/router/router';

const router = useRouter();
onMounted(async () => {
  try {
    const { data } = await axios.get('/api/user/me');
    if (!data) throw Error;
    await router.push(Pages.movies);
  } catch (err) {
    await router.push(Pages.login);
  }
});
</script>
