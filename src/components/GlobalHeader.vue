<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="d-flex w-100 mx-4 justify-content-between">
      <router-link to="/" class="navbar-brand" href="#">〇〇大学</router-link>
      <button class="btn btn-secondary btn-sm" @click="logout">ログアウト</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import LoginRepository from '../apis/LoginRepository';

const logout = () => {
  LoginRepository.logout();
};
</script>
