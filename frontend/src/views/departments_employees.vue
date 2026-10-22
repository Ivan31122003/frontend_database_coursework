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
      :headers="state.departments_employees.headers"
      :rows="state.departments_employees.rows"
      @createRow="createDepartmentsEmployeesButtonClick"
      @updateRow="updateDepartmentsEmployeesButtonClick"
      @deleteRow="deleteDepartmentsEmployeesButtonClick"
    />
  </div>
</template>

<script setup>
  import { createNotify } from '@/notify.js';
  import NavBar from '@/components/nav-bar.vue';
  import Popup from '@/components/popup.vue';
  import Grid from '@/components/grid.vue';
  import {
    putDepartmentsEmployees,
    updateDepartmentsEmployees,
    deleteDepartmentsEmployees,
  } from '@/service.js';
  import { ref, onMounted } from 'vue';
  import store from '@/store.js';
  const { state, getDepartmentsEmployeesList } = store;

  const response = ref(false);
  const buttonText = ref();

  onMounted(async () => {
    response.value = await getDepartmentsEmployeesList();
    if (!response.value) {
      createNotify('error', 'У вас нет доступа');
    }
  });

  const createDepartmentsEmployeesButtonClick = () => {
    state.isButtonClick = true;
    state.isCreateButtonClick = true;
    buttonText.value = 'Добавить';
    state.departments_employees.headers.forEach((field) => {
      if (field !== 'id') {
        state.newRow[field] = null;
      }
    });
  };

  const updateDepartmentsEmployeesButtonClick = () => {
    buttonText.value = 'Редактировать';
    state.isCreateButtonClick = false;
    state.isButtonClick = true;
    const department_employee = state.departments_employees.rows.find(
      (row) => row.id === state.selectedRows[0]
    );
    state.departments_employees.headers.forEach((field) => {
      if (field !== 'id') {
        state.newRow[field] = department_employee[field];
      }
    });
  };

  const deleteDepartmentsEmployeesButtonClick = async () => {
    const result = await deleteDepartmentsEmployees(state.selectedRows);
    if (result?.access === false) {
      createNotify('error', 'У вас нет доступа на выполнение данной операции');
      return;
    } else if (result.success === false) {
      createNotify('error', 'Ошибка');
      return;
    }
    createNotify('success', 'Выделенные строки успешно удалены');
    state.selectedRows = [];
    await getDepartmentsEmployeesList();
  };

  const popupButtonClick = () => {
    state.isCreateButtonClick
      ? createDepartmentEmployee()
      : updateDepartmentEmployee();
  };

  const createDepartmentEmployee = async () => {
    for (const key in state.newRow) {
      if (state.newRow[key] === null || state.newRow[key] === '') {
        createNotify('error', 'Не все поля заполены');
        return;
      }
    }

    const result = await putDepartmentsEmployees(state.newRow);

    if (result?.access === false) {
      createNotify('error', 'У вас нет доступа на выполнение данной операции');
      return;
    }

    if (result?.error) {
      createNotify('error', result.error);
      return;
    }

    if (result?.success) {
      createNotify('success', 'Пользователь добавлен');
      state.newRow = {};
      state.isButtonClick = false;
      await getDepartmentsEmployeesList();
      return;
    } else {
      createNotify('error', 'Ошибка');
    }
  };

  const updateDepartmentEmployee = async () => {
    for (const key in state.newRow) {
      if (state.newRow[key] === null || state.newRow[key] === '') {
        createNotify('error', 'Не все поля заполены');
        return;
      }
    }

    const departmentEmployee = { ...state.newRow, id: state.selectedRows[0] };
    const result = await updateDepartmentsEmployees(departmentEmployee);

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
      await getDepartmentsEmployeesList();
      return;
    } else {
      createNotify('error', 'Ошибка');
    }
  };
</script>
