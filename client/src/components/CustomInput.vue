<script setup>
const { id, label, type, placeholder } = defineProps({
  id: String,
  label: String,
  type: String,
  placeholder: String
});
let error = null;
</script>

<script>
export default {
  name: 'CustomInput',
  data() {
    return {
      text: ''
    };
  }
};
</script>

<template>
  <div class="inputWrapper">
    <label class="inputLabel" :for="id" v-if="label">{{ label }}</label>
    <input class="input" :id="id" :name="id" :type="type" :placeholder="placeholder" v-model="text" />
    <span v-if="error"></span>
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
