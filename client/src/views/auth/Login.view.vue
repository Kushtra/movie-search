<script setup>
import VInput from '@/components/VInput.vue';
import VButton from '@/components/VButton.vue';
import { useAuthStore } from '@/stores';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const login = async evnt => {
  const form = new FormData(evnt.target);
  const formData = Object.fromEntries(form.entries());
  return authStore.login(formData, router);
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
