<template>
  <div class="background-custom w-full h-full flex flex-col items-center">
    <nav-bar />
    <grid
      v-if="response"
      :headers="state.users.headers"
      :rows="state.users.rows"
    />
  </div>
</template>

<script setup>
  import Noty from 'noty';
  import 'noty/lib/noty.css';
  import NavBar from '@/components/nav-bar.vue';
  import Grid from '@/components/grid.vue';
  import { ref, onMounted } from 'vue';
  import store from '@/store.js';

  const { state, getUsersList } = store;
  const response = ref('false');

  onMounted(async () => {
    response.value = await getUsersList();
    if (!response.value) {
      new Noty({
        text: 'У вас нет доступа',
        type: 'error',
        layout: 'topLeft',
        timeout: 3000,
      }).show();
    }
  });
</script>
