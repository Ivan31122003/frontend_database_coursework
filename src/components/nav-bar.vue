<template>
  <div class="w-full h-[150px] flex justify-center border-b-[1px]">
    <div class="my-10 flex w-[1200px] justify-between items-center">
      <div class="flex justify-between">
        <div
          class="bg-transparent border-solid border-2 border-gray-300 rounded-md w-[180px] h-[80px] mx-3 p-[10px] flex justify-center items-center text-center text-slate-100 hover:bg-white hover:text-black hover:font-medium cursor-pointer"
          v-for="(item, index) in navElements"
          @click="() => router.push({ name: item.routeName })"
          :key="index"
        >
          {{ item.text }}
        </div>
      </div>
      <button
        class="px-[20px] py-[2px] text-xl text-slate-50 rounded-xl border-solid border-white border-[1px] hover:bg-white hover:text-black transition duration-200"
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
    { text: 'Проекты', routeName: 'Projects' },
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
