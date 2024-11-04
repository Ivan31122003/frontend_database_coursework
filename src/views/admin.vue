<template>
  <div class="background-custom w-full h-full">
    <nav-bar />
    <grid :headers="state.users.headers" :rows="state.users.rows" />
  </div>
</template>

<script setup>
  import NavBar from '@/components/nav-bar.vue';
  import Grid from '@/components/grid.vue';
  import { onMounted } from 'vue';
  import store from '@/store.js';
  const { state, getUsersList } = store;

  onMounted(async () => {
    await getUsersList();
  });
</script>
