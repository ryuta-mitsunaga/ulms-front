import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import TopView from '../views/TopView.vue';
import ChangePassword from '../views/ChangePassword.vue';

const routes = [
  {
    path: '/',
    name: 'top',
    component: TopView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: ChangePassword,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
