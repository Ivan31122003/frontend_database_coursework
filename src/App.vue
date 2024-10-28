<template>
  <div
    class="background-custom w-full h-[100%] flex justify-center items-center"
  >
    <div
      class="p-4 bg-neutral-600 flex flex-col justify-around items-center w-[20%] h-[50%] max-w-[350px] min-w-[250px] rounded-lg"
    >
      <div class="text-3xl text-slate-50 flex">Авторизация</div>
      <div class="text-3xl text-slate-50 flex">{{ response }}</div>
      <div class="flex flex-col justify-between">
        <div class="flex flex-col items-center">
          <input
            v-model="authData.login"
            placeholder="Логин"
            class="m-2 p-3 w-[250px] h-[35px] rounded-xl"
          />
          <input
            v-model:="authData.password"
            placeholder="Пароль"
            type="password"
            class="m-2 p-3 w-[250px] h-[35px] rounded-xl"
          />
        </div>
        <button
          class="m-4 px-[20px] py-[2px] text-xl text-slate-50 rounded-xl border-solid border-white border-[2px] hover:bg-white hover:text-black transition duration-200"
          @click="sendAuthData"
        >
          Войти
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { auth } from './service.js';
  import { reactive, ref } from 'vue';

  const response = ref(123);
  const authData = reactive({
    login: null,
    password: null,
  });

  const sendAuthData = async () => {
    response.value = await auth(authData.login, authData.password);
  };
</script>

<style>
  html,
  body,
  #app {
    height: 100%;
    margin: 0;
  }

  .background-custom {
    background: rgb(17, 17, 17);
    background: linear-gradient(
      135deg,
      rgba(17, 17, 17, 1) 0%,
      rgba(41, 41, 41, 1) 100%
    );
  }
</style>
