<template>
  <router-view></router-view>
</template>

<script setup>
  import { onMounted } from 'vue';
  import router from '@/router.js';
  import { getCookie } from '@/cookie.js';

  onMounted(() => {
    if (getCookie('token') === undefined) {
      router.push({ name: 'LoginForm' });
    }
  });
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
