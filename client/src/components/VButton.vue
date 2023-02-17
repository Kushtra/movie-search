<script setup>
const { text } = defineProps({
  type: String,
  text: String
});
</script>

<template>
  <button>{{ text }}</button>
</template>
