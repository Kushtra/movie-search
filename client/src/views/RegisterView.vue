<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'Register',
  setup() {
    const router = useRouter();
    const submit = async evnt => {
      const form = new FormData(evnt.target);
      const inputs = Object.fromEntries(form.entries());
      await axios.post('user', inputs);
      await router.push('/movie');
    };

    return { submit };
  }
};
</script>

<template>
  <main>
    <form @submit.prevent="submit" class="registerForm" method="post">
      <label for="email">Email</label>
      <input id="email" type="text" />
      <label for="password">Password</label>
      <input id="password" type="password" />
      <button type="submit">Register</button>
    </form>
  </main>
</template>

<style>
main {
  width: 100vw;
  height: 100vh;
}
label:hover {
  cursor: pointer;
}
.registerForm {
  position: absolute;
  left: 50%;
  bottom: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  gap: 0;
}
</style>
