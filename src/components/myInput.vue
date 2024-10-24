<template>
  <input
    class="m-2 p-3 w-[250px] h-[35px] rounded-xl"
    :placeholder="placeholder"
    :type="type"
    autocomplete="off"
  />
</template>

<script setup>
defineProps({
  placeholder: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
})
</script>

<style></style>
