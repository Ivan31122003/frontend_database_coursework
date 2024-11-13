<template>
  <div class="background-custom w-full h-full flex flex-col items-center">
    <nav-bar />
    <popup
      v-if="state.isButtonClick"
      :buttonText="buttonText"
      @buttonClick="popupButtonClick"
    />
    <grid
      v-if="response"
      :headers="state.employees.headers"
      :rows="state.employees.rows"
      @createRow="createEmployeeButtonClick"
      @updateRow="updateEmployeeButtonClick"
      @deleteRow="deleteEmployeeButtonClick"
    />
  </div>
</template>

<script setup>
  import { createNotify } from '@/notify.js';
  import NavBar from '@/components/nav-bar.vue';
  import Popup from '@/components/popup.vue';
  import Grid from '@/components/grid.vue';
  import { putEmployees, updateEmployees, deleteEmployees } from '@/service.js';
  import { ref, onMounted } from 'vue';
  import store from '@/store.js';
  const { state, getEmployeesList } = store;

  const response = ref(false);
  const buttonText = ref();

  onMounted(async () => {
    response.value = await getEmployeesList();
    if (!response.value) {
      createNotify('error', 'У вас нет доступа');
    }
  });

  const createEmployeeButtonClick = () => {
    state.isButtonClick = true;
    state.isCreateButtonClick = true;
    buttonText.value = 'Добавить';
    state.employees.headers.forEach((field) => {
      if (field !== 'id') {
        state.newRow[field] = null;
      }
    });
  };

  const updateEmployeeButtonClick = () => {
    buttonText.value = 'Редактировать';
    state.isCreateButtonClick = false;
    state.isButtonClick = true;
    const employee = state.employees.rows.find(
      (row) => row.id === state.selectedRows[0]
    );
    state.employees.headers.forEach((field) => {
      if (field !== 'id') {
        state.newRow[field] = employee[field];
      }
    });
  };

  const deleteEmployeeButtonClick = async () => {
    const result = await deleteEmployees(state.selectedRows);
    if (result?.access === false) {
      createNotify('error', 'У вас нет доступа на выполнение данной операции');
      return;
    } else if (result.success === false) {
      createNotify('error', 'Ошибка');

      return;
    }
    createNotify('success', 'Выделенные сотрудники успешно удалены');
    state.selectedRows = [];
    await getEmployeesList();
  };

  const popupButtonClick = () => {
    state.isCreateButtonClick ? createEmployee() : updateEmployee();
  };

  const createEmployee = async () => {
    for (const key in state.newRow) {
      if (state.newRow[key] === null || state.newRow[key] === '') {
        createNotify('error', 'Не все поля заполены');
        return;
      }
    }

    const result = await putEmployees(state.newRow);

    if (result?.access === false) {
      createNotify('error', 'У вас нет доступа на выполнение данной операции');
      return;
    }

    if (result?.error) {
      createNotify('error', result.error);
      return;
    }

    if (result?.success) {
      createNotify('success', 'Сотрудник добавлен');
      state.newRow = {};
      state.isButtonClick = false;
      await getEmployeesList();
      return;
    } else {
      createNotify('error', 'Ошибка');
    }
  };

  const updateEmployee = async () => {
    for (const key in state.newRow) {
      if (state.newRow[key] === null || state.newRow[key] === '') {
        createNotify('error', 'Не все поля заполены');
        return;
      }
    }

    const employee = { ...state.newRow, id: state.selectedRows[0] };
    const result = await updateEmployees(employee);

    if (result?.access === false) {
      createNotify('error', 'У вас нет доступа на выполнение данной операции');
      return;
    }

    if (result?.error) {
      createNotify('error', result.error);
      return;
    }

    if (result?.success) {
      createNotify('success', 'Данные сотрудника обновлены');
      state.newRow = {};
      state.isButtonClick = false;
      state.selectedRows = [];
      await getEmployeesList();
      return;
    } else {
      createNotify('error', 'Ошибка');
    }
  };
</script>
