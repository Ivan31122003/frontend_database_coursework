import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/views/login-form.vue';
import MainPage from '@/views/main-page.vue';
import NotFound from '@/views/not-found.vue';

const routes = [
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
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
