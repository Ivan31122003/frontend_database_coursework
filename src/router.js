import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/views/login-form.vue';
import MainPage from '@/views/main-page.vue';
import Employees from '@/views/employees.vue';
import Departments from '@/views/departments.vue';
import Projects from '@/views/projects.vue';
import DepartmentsEmployees from '@/views/departments_employees.vue';
import Admin from '@/views/admin.vue';
import NotFound from '@/views/not-found.vue';

import store from '@/store.js';
const { state } = store;

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'LoginForm',
    component: LoginForm,
  },
  {
    path: '/main',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/employees',
    name: 'Employees',
    component: Employees,
  },
  {
    path: '/departments',
    name: 'Departments',
    component: Departments,
  },
  { path: '/projects', name: 'Projects', component: Projects },
  {
    path: '/employees_departments',
    name: 'DepartmentsEmployees',
    component: DepartmentsEmployees,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  (state.newRow = {}), (state.selectedRows = []);
  next();
});

export default router;
