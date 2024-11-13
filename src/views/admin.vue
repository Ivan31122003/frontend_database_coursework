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
      :headers="state.users.headers"
      :rows="state.users.rows"
    />
  </div>
</template>

<script setup>
  import { createNotify } from '@/notify.js';
  import NavBar from '@/components/nav-bar.vue';
  import Popup from '@/components/popup.vue';
  import Grid from '@/components/grid.vue';
  import { ref, onMounted } from 'vue';
  import store from '@/store.js';
  const { state, getUsersList } = store;

  const response = ref(false);
  const buttonText = ref();

  onMounted(async () => {
    response.value = await getUsersList();
    if (!response.value) {
      createNotify('error', 'У вас нет доступа');
    }
  });
</script>
