<template>
  <div class="background-custom w-full h-full flex flex-col items-center">
    <nav-bar />
    <create-row-popup
      v-if="state.isCreateButtonClick"
      @addNewRow="addEmployee"
    />
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
  import CreateRowPopup from '@/components/create-row-popup.vue';
  import Grid from '@/components/grid.vue';
  import { putEmployees } from '@/service.js';
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

  const addEmployee = async () => {
    for (const key in state.newRow) {
      if (state.newRow[key] === null) {
        new Noty({
          text: 'Не все поля заполнены',
          type: 'error',
          layout: 'topLeft',
          timeout: 3000,
        }).show();
        return;
      }
    }

    const result = await putEmployees(state.newRow);
    console.log(result);
    if (result?.error) {
      new Noty({
        text: result.error,
        type: 'error',
        layout: 'topLeft',
        timeout: 3000,
      }).show();
      return;
    }

    if (result?.success) {
      new Noty({
        text: 'Пользователь добавлен',
        type: 'success',
        layout: 'topLeft',
        timeout: 3000,
      }).show();
      state.newRow = {};
      state.isCreateButtonClick = false;
      await getEmployeesList();
      return;
    } else {
      new Noty({
        text: 'Ошибка',
        type: 'error',
        layout: 'topLeft',
        timeout: 3000,
      }).show();
      return;
    }
  };
</script>
