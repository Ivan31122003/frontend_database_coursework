<template>
  <router-view></router-view>
</template>

<script setup>
  import { onMounted, watch } from 'vue';
  import router from '@/router.js';
  import { getCookie } from '@/cookie.js';

  onMounted(() => {
    checkCookie();
  });

  const checkCookie = () => {
    if (getCookie('token') === undefined) {
      router.push({ name: 'LoginForm' });
    }
  };
</script>

<style>
  html,
  body,
  #app {
    height: 100%;
    margin: 0;
  }
  body {
    background: rgba(41, 41, 41, 1);
  }
  .background-custom {
    background: rgba(41, 41, 41, 1);
  }
</style>
