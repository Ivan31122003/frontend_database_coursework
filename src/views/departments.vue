<template>
  <div class="background-custom w-full h-full flex flex-col items-center">
    <nav-bar />
    <popup
      v-if="state.isButtonClick"
      :buttonText="buttonText"
      @buttonClick="popupButtonClick"
    />
    <grid
      :headers="state.departments.headers"
      :rows="state.departments.rows"
      @createRow="createDepartmentButtonClick"
      @updateRow="updateDepartmentButtonClick"
      @deleteRow="deleteDepartmentButtonClick"
    />
  </div>
</template>

<script setup>
  import { createNotify } from '@/notify.js';
  import NavBar from '@/components/nav-bar.vue';
  import Popup from '@/components/popup.vue';
  import Grid from '@/components/grid.vue';
  import {
    putDepartments,
    updateDepartments,
    deleteDepartments,
  } from '@/service.js';
  import { ref, onMounted } from 'vue';
  import store from '@/store.js';
  const { state, getDepartmentsList } = store;

  const response = ref('false');
  const buttonText = ref();

  onMounted(async () => {
    response.value = await getDepartmentsList();
    if (!response.value) {
      createNotify('error', 'У вас нет доступа');
    }
  });

  const createDepartmentButtonClick = () => {
    state.isButtonClick = true;
    state.isCreateButtonClick = true;
    buttonText.value = 'Добавить';
    state.departments.headers.forEach((field) => {
      if (field !== 'id') {
        state.newRow[field] = null;
      }
    });
  };

  const updateDepartmentButtonClick = () => {
    buttonText.value = 'Редактировать';
    state.isCreateButtonClick = false;
    state.isButtonClick = true;
    const department = state.departments.rows.find(
      (row) => row.id === state.selectedRows[0]
    );
    state.departments.headers.forEach((field) => {
      if (field !== 'id') {
        state.newRow[field] = department[field];
      }
    });
  };

  const deleteDepartmentButtonClick = async () => {
    const result = await deleteDepartments(state.selectedRows);
    if (result?.access === false) {
      createNotify('error', 'У вас нет доступа на выполнение данной операции');
      return;
    } else if (result.success === false) {
      createNotify('error', 'Ошибка');
      return;
    }
    createNotify('success', 'Выделенные отделы успешно удалены');
    state.selectedRows = [];
    await getDepartmentsList();
  };

  const popupButtonClick = () => {
    state.isCreateButtonClick ? createDepartment() : updateDepartment();
  };

  const createDepartment = async () => {
    for (const key in state.newRow) {
      if (state.newRow[key] === null) {
        createNotify('error', 'Не все поля заполены');
        return;
      }
    }

    const result = await putDepartments(state.newRow);

    if (result?.access === false) {
      createNotify('error', 'У вас нет доступа на выполнение данной операции');
      return;
    }

    if (result?.error) {
      createNotify('error', result.error);
      return;
    }

    if (result?.success) {
      createNotify('success', 'Отдел добавлен');
      state.newRow = {};
      state.isButtonClick = false;
      await getDepartmentsList();
      return;
    } else {
      createNotify('error', 'Ошибка');
    }
  };

  const updateDepartment = async () => {
    for (const key in state.newRow) {
      if (state.newRow[key] === null || state.newRow[key] === '') {
        createNotify('error', 'Не все поля заполены');
        return;
      }
    }

    const department = { ...state.newRow, id: state.selectedRows[0] };
    const result = await updateDepartments(department);

    if (result?.access === false) {
      createNotify('error', 'У вас нет доступа на выполнение данной операции');
      return;
    }

    if (result?.error) {
      createNotify('error', result.error);
      return;
    }

    if (result?.success) {
      createNotify('success', 'Данные отдела обновлены');
      state.newRow = {};
      state.isButtonClick = false;
      state.selectedRows = [];
      await getDepartmentsList();
      return;
    } else {
      createNotify('error', 'Ошибка');
    }
  };
</script>
