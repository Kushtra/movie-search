<script setup>
import axios from '@/libs/axios';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Pages } from '@/constants';

const router = useRouter();
onMounted(async () => {
  try {
    const { data } = await axios.get('/api/user/me');
    if (!data) throw Error;
    return router.push(Pages.movies);
  } catch (err) {
    return router.push(Pages.login);
  }
});
</script>
