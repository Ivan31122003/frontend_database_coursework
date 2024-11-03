<template>
  <div
    class="background-custom w-full h-[100%] flex justify-center items-center"
  >
    <div
      class="p-4 bg-neutral-600 flex flex-col justify-around items-center h-[50%] w-[350px] rounded-lg"
    >
      <div class="text-3xl text-slate-50 flex">Авторизация</div>
      <div class="text-3xl text-slate-50 flex">{{ message }}</div>
      <div class="flex flex-col justify-between">
        <div class="flex flex-col items-center">
          <input
            v-model="authData.username"
            placeholder="Логин"
            type="text"
            class="m-2 p-3 w-[250px] h-[35px] rounded-xl"
          />
          <input
            v-model="authData.password"
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
  import { setCookie } from '@/cookie';
  import router from '@/router';
  import { auth } from '@/service.js';
  import { reactive, ref } from 'vue';

  const message = ref(null);
  const authData = reactive({
    username: null,
    password: null,
  });

  const sendAuthData = async () => {
    const response = await auth(authData.username, authData.password);
    if (response?.success) {
      setCookie('token', response.token);
      router.push({ name: 'MainPage' });
    } else {
      message.value = 'Неверный логин или пароль';
    }
  };
</script>

<style scoped></style>
