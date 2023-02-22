<script>
import VInput from '@/components/VInput.vue';
import VButton from '@/components/VButton.vue';
import { useRouter } from 'vue-router';
import axios from '@/libs/axios';

export default {
  name: 'Login',
  components: { VInput, VButton },
  setup() {
    const router = useRouter();
    const submit = async evnt => {
      const form = new FormData(evnt.target);
      const inputs = Object.fromEntries(form.entries());
      const { data } = await axios.post('/api/auth/login', inputs).catch(e => console.error(e));
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
      await router.push('/movies');
    };
    return { submit };
  }
};
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="submit">
      <VInput id="email" label="Email" placeholder="email@provider.com" />
      <VInput id="password" label="Password" type="password" />
      <VButton type="submit" text="Submit" />
    </form>
  </div>
</template>
