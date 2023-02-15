<script>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/movies">Movies</RouterLink>
    </nav>
    <h1>Home</h1>

    <form class="test">
      <input type="email" />
      <input type="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style>
.test {
  max-width: 12em;
  display: grid;
}
</style>
