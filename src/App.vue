<template>
  <div
    class="background-custom w-full h-[100%] flex justify-center items-center"
  >
    <div
      class="p-4 bg-neutral-600 flex flex-col justify-around items-center w-[20%] h-[50%] max-w-[350px] min-w-[250px] rounded-lg"
    >
      <div class="text-3xl text-slate-50 flex">Авторизация</div>
      <div class="flex flex-col justify-between">
        <div class="flex flex-col items-center">
          <myInput class="mb-3" placeholder="Логин" />
          <myInput placeholder="Пароль" type="password" />
        </div>
        <myButton text="Войти" />
      </div>
    </div>
  </div>
</template>

<script setup>
import myInput from './components/myInput.vue'
import myButton from './components/myButton.vue'
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
