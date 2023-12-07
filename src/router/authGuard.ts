import { Router } from 'vue-router';

// https://zenn.dev/kawataku/articles/71468ceb6d96e8
export const authGuard = (router: Router) => {
  router.beforeEach((to) => {
    if (to.meta.requiresAuth && localStorage.getItem('studentId') === null) {
      return { name: 'login' };
    }
  });
};
