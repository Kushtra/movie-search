<script setup>
const { id, label, type, placeholder, required, error } = defineProps({
  id: String,
  label: String,
  type: String,
  placeholder: String,
  required: Boolean,
  error: String
});
</script>

<template>
  <div class="inputWrapper">
    <label class="inputLabel" :for="id" v-if="label">{{ label }}</label>
    <input class="input" :id="id" :name="id" :type="type" :placeholder="placeholder" :required="required" />
    <span v-if="error">{{ error }}</span>
  </div>
</template>

<style scoped>
.inputWrapper {
  display: grid;
  place-items: center;
}
.inputLabel {
  color: white;
  font-size: 16px;
}
.input {
  border-radius: 4px;
  min-width: 200px;
  min-height: 32px;
  font-size: 20px;
}
</style>
