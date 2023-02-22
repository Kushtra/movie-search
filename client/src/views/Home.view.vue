<script>
import axios from '@/libs/axios';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    onMounted(async () => {
      try {
        const { data } = await axios.get('/api/user/me');
        if (!data) throw Error;
        await router.push('/movies');
      } catch (err) {
        await router.push('/login');
      }
    });
  }
};
</script>
