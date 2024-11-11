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
      :headers="state.projects.headers"
      :rows="state.projects.rows"
      @createRow="createProjectButtonClick"
      @updateRow="updateProjectButtonClick"
      @deleteRow="deleteProjectButtonClick"
    />
  </div>
</template>

<script setup>
  import { createNotify } from '@/notify.js';
  import NavBar from '@/components/nav-bar.vue';
  import Popup from '@/components/popup.vue';
  import Grid from '@/components/grid.vue';
  import { putProjects, updateProjects, deleteProjects } from '@/service.js';
  import { ref, onMounted } from 'vue';
  import store from '@/store.js';
  const { state, getProjectsList } = store;

  const response = ref('false');
  const buttonText = ref();

  onMounted(async () => {
    response.value = await getProjectsList();
    if (!response.value) {
      createNotify('error', 'У вас нет доступа');
    }
  });

  const createProjectButtonClick = () => {
    state.isButtonClick = true;
    state.isCreateButtonClick = true;
    buttonText.value = 'Добавить';
    state.projects.headers.forEach((field) => {
      if (field !== 'id') {
        state.newRow[field] = null;
      }
    });
  };

  const updateProjectButtonClick = () => {
    buttonText.value = 'Редактировать';
    state.isCreateButtonClick = false;
    state.isButtonClick = true;
    const project = state.projects.rows.find(
      (row) => row.id === state.selectedRows[0]
    );
    state.projects.headers.forEach((field) => {
      if (field !== 'id') {
        state.newRow[field] = project[field];
      }
    });
  };

  const deleteProjectButtonClick = async () => {
    const result = await deleteProjects(state.selectedRows);
    if (result?.access === false) {
      createNotify('error', 'У вас нет доступа на выполнение данной операции');
      return;
    } else if (result.success === false) {
      createNotify('error', 'Ошибка');

      return;
    }
    createNotify('success', 'Выделенные сотрудники успешно удалены');
    state.selectedRows = [];
    await getProjectsList();
  };

  const popupButtonClick = () => {
    state.isCreateButtonClick ? createProject() : updateProject();
  };

  const createProject = async () => {
    for (const key in state.newRow) {
      if (state.newRow[key] === null || state.newRow[key] === '') {
        createNotify('error', 'Не все поля заполены');
        return;
      }
    }

    const result = await putProjects(state.newRow);

    if (result?.access === false) {
      createNotify('error', 'У вас нет доступа на выполнение данной операции');
      return;
    }

    if (result?.error) {
      createNotify('error', result.error);
      return;
    }

    if (result?.success) {
      createNotify('success', 'Проект добавлен');
      state.newRow = {};
      state.isButtonClick = false;
      await getProjectsList();
      return;
    } else {
      createNotify('error', 'Ошибка');
    }
  };

  const updateProject = async () => {
    for (const key in state.newRow) {
      if (state.newRow[key] === null || state.newRow[key] === '') {
        createNotify('error', 'Не все поля заполены');
        return;
      }
    }

    const project = { ...state.newRow, id: state.selectedRows[0] };
    const result = await updateProjects(project);

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
      await getProjectsList();
      return;
    } else {
      createNotify('error', 'Ошибка');
    }
  };
</script>
