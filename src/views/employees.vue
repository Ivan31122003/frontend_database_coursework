<template>
  <div class="background-custom w-full h-full flex flex-col items-center">
    <nav-bar />
    <toolbar v-if="state.isCreateButtonClick" @addNewRow="addEmployee" />
    <grid
      :headers="state.employees.headers"
      :rows="state.employees.rows"
      @createNewRow="createEmployee"
    />
  </div>
</template>

<script setup>
  import Noty from 'noty';
  import 'noty/lib/noty.css';
  import NavBar from '@/components/nav-bar.vue';
  import Toolbar from '@/components/toolbar.vue';
  import Grid from '@/components/grid.vue';
  import { ref, onMounted } from 'vue';
  import store from '@/store.js';
  const { state, getEmployeesList } = store;

  const response = ref('false');

  onMounted(async () => {
    response.value = await getEmployeesList();
    if (!response.value) {
      new Noty({
        text: 'У вас нет доступа',
        type: 'error',
        layout: 'topLeft',
        timeout: 3000,
      }).show();
    }
  });

  const createEmployee = () => {
    state.isCreateButtonClick = true;
    state.employees.headers.forEach((field) => {
      if (field !== 'id') {
        state.newRow[field] = null;
      }
    });
  };

  const addEmployee = () => {};
</script>
