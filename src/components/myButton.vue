<template>
  <button
    class="m-4 px-[20px] py-[2px] text-xl text-slate-50 rounded-xl border-solid border-white border-[2px] hover:bg-white hover:text-black transition duration-200"
  >
    {{ text }}
  </button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
})
</script>

<style></style>
