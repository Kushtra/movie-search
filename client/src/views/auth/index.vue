<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div>
    <header>
      <nav>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </nav>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>
