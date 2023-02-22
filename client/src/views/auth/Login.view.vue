<script setup>
import VInput from '@/components/VInput.vue';
import VButton from '@/components/VButton.vue';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const login = async evnt => {
  const form = new FormData(evnt.target);
  const { email, password } = Object.fromEntries(form.entries());
  await authStore.login(email, password);
  await router.push('/movies');
};
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <VInput id="email" label="Email" placeholder="email@provider.com" />
      <VInput id="password" label="Password" type="password" />
      <VButton type="submit" text="Submit" />
    </form>
  </div>
</template>
