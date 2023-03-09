<script setup>
const { text, type } = defineProps({ type: String, text: String });
</script>

<template>
  <button :type="type">{{ text }}</button>
</template>

<style scoped>
button {
  all: unset;
}
</style>
