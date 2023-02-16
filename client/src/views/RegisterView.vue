<script setup>
import CustomInput from '../components/CustomInput.vue';
</script>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'Register',
  components: { CustomInput },
  setup() {
    const router = useRouter();
    const submit = async evnt => {
      console.log(evnt);
      const form = new FormData(evnt.target);
      const inputs = Object.fromEntries(form.entries());
      const { data } = await axios.post('/user', inputs).catch(e => console.error('err', e));
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.refreshToken}`;
      await router.push('/movies');
    };

    return { submit };
  }
};
</script>

<template>
  <main>
    <form @submit.prevent="submit" class="registerForm" method="post">
      <input name="tester" />
      <CustomInput id="email" placeholder="mitch@ee.com" />
      <CustomInput id="password" label="Password" type="password" />
      <CustomInput id="re-password" label="Repeat password" type="password" />
      <button type="submit" @click="submit">Register</button>
    </form>
  </main>
</template>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
}
label:hover {
  cursor: pointer;
}
.registerForm {
  display: grid;
  place-items: center;
  gap: 1em;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 60px;
}
</style>
