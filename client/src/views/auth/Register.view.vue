<script setup>
import VInput from '@/components/VInput.vue';
import VButton from '@/components/VButton.vue';
import { useUsersStore } from '@/stores';
import { useRouter } from 'vue-router';
import { Pages } from '@/constants';
import { z } from 'zod';

const router = useRouter();
const userStore = useUsersStore();
const register = async evnt => {
  const form = new FormData(evnt.target);
  const inputs = Object.fromEntries(form.entries());
  const inputError = validateInput(inputs);
  if (inputError) return console.error(inputError);
  await userStore.register(inputs.email, inputs.password);
  await router.push(Pages.movies);
};
const validateInput = inputs => {
  // use monorepo common dir
  const formValidator = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(32)
  });
  const validated = formValidator.safeParse({ email: inputs.email, password: inputs.password });
  if (!validated.success) {
    console.log(validated.error);
  }
  if (inputs.password !== inputs['re-password']) return 'Password must match';
  return false;
};
</script>

<template>
  <form @submit.prevent="register" class="registerForm" method="post">
    <VInput id="email" label="Email" placeholder="email@provider.com" />
    <VInput id="password" label="Password" type="password" />
    <VInput id="re-password" label="Repeat password" type="password" />
    <VButton type="submit" text="Submit" />
  </form>
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
