<template>
  <div class="background-custom w-full h-full flex flex-col items-center">
    <nav-bar />
    <grid
      v-if="access"
      :headers="state.departments.headers"
      :rows="state.departments.rows"
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
  const { state, getDepartmentsList } = store;

  const access = ref('false');

  onMounted(async () => {
    access.value = await getDepartmentsList();
    if (!access.value) {
      new Noty({
        text: 'У вас нет доступа',
        type: 'error',
        layout: 'topLeft',
        timeout: 3000,
      }).show();
    }
  });
</script>
