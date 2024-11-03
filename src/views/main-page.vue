<template>
  <div class="background-custom w-[100%] h-[100%]">
    <button class="float-right" @click="unauth">Выход</button>
    <div class="flex justify-center items-center w-[100%] h-[100%]">
      <div class="flex w-[300px] justify-between">
        <div class="bg-white">123</div>
        <div class="bg-white">123</div>
        <div class="bg-white">123</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { deleteCookie } from '@/cookie';
  import router from '@/router.js';

  const unauth = () => {
    deleteCookie('token');
    router.push({ name: 'LoginForm' });
  };
</script>
