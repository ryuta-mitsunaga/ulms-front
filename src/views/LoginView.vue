<template>
  <div>
    <div>
      <form @submit.prevent="login">
        <div>
          <input class="form-control mb-1" v-model="loginInfo.email" type="email" placeholder="メールアドレス" />
          <input class="form-control" v-model="loginInfo.password" type="password" placeholder="パスワード" />
        </div>
        <div class="mt-2">
          <button class="btn btn-primary" type="submit">ログイン</button>
        </div>

        <div class="mt-1">
          <router-link to="/changePassword">パスワード変更</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '../router';
import LoginRepository, { LoginRequest } from '../apis/LoginRepository';
import { reactive } from 'vue';

const loginInfo = reactive<LoginRequest>({
  email: '',
  password: '',
});

/** ログイン処理 */
const login = async () => {
  const response = await LoginRepository.login(loginInfo);

  if (String(response.statusCode) === '200') router.push('/');
};
</script>
