<template>
  <div class="w-full h-[150px] flex justify-center border-b-[1px] z-0">
    <div class="flex w-[1200px] justify-between items-center border-b-1">
      <div class="flex justify-between">
        <div
          class="bg-transparent border-solid border-2 border-gray-300 rounded-md w-[230px] h-[100px] mx-3 p-[10px] flex justify-center items-center text-center text-slate-100 text-xl hover:bg-white hover:text-black hover:font-medium transition duration-200 cursor-pointer"
          v-for="(item, index) in navElements"
          @click="() => router.push({ name: item.routeName })"
          :key="index"
        >
          {{ item.text }}
        </div>
      </div>
      <button
        class="h-[40px] px-4 text-slate-100 bg-red-500 rounded-md"
        @click="unauth"
      >
        Выход
      </button>
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

  const navElements = [
    { text: 'Сотрудники', routeName: 'Employees' },
    { text: 'Отделы', routeName: 'Departments' },
    {
      text: 'Привязка сотрудников к отделам',
      routeName: 'DepartmentsEmployees',
    },
    {
      text: 'Администрирование',
      routeName: 'Admin',
    },
  ];
</script>
