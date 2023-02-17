<script>
import VInput from '../../components/VInput.vue';
import VButton from '../../components/VButton.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { z } from 'zod';

export default {
  name: 'Register',
  components: { VButton, VInput },
  setup() {
    const router = useRouter();
    const submit = async evnt => {
      const form = new FormData(evnt.target);
      const inputs = Object.fromEntries(form.entries());
      const inputError = validateInput(inputs.email, inputs.password, inputs['re-password']);
      if (inputError) return;
      delete inputs['re-password'];
      const { data } = await axios.post('/api/auth/register', inputs).catch(e => console.error('err', e));
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
      await router.push('/movies');
    };
    return { submit };
  }
};

const validateInput = (email, password, repass) => {
  // use monorepo common dir
  const formValidator = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(32)
  });
  const validated = formValidator.safeParse({ email, password });
  if (!validated.success) {
    console.log(validated.error);
  }
  if (password !== repass) return 'Password must match';
  return false;
};
</script>

<template>
  <main>
    <form @submit.prevent="submit" class="registerForm" method="post">
      <VInput id="email" label="Email" placeholder="email@provider.com" />
      <VInput id="password" label="Password" type="password" />
      <VInput id="re-password" label="Repeat password" type="password" />
      <VButton type="submit" text="Submit" />
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
