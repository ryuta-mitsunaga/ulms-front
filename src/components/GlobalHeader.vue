<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="d-flex w-100 mx-4 justify-content-between">
      <router-link to="/" class="navbar-brand" href="#">〇〇大学</router-link>
      <div>
        <button v-show="showLogoutButton" class="btn btn-success btn-sm me-2" @click="changePassword">
          パスワードを変更
        </button>
        <button v-show="showLogoutButton" class="btn btn-secondary btn-sm" @click="logout">ログアウト</button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import LoginRepository from '../apis/LoginRepository';
import { useRoute } from 'vue-router';
import router from '../router';
import { useAlert } from '../composables/useAlert';

const logout = async () => {
  await LoginRepository.logout();
  localStorage.removeItem('token');
  useAlert().showAlert('ログアウトしました');
  router.push('login');
};

const changePassword = () => router.push('changePassword');

const showLogoutButton = computed(() => useRoute().path !== '/login');
</script>
