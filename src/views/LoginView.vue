<template>
  <div style="width: 300px; margin: auto">
    <div>
      <form @submit.prevent="login">
        <div>
          <input
            class="form-control mb-1"
            v-model="loginInfo.email"
            type="email"
            required
            placeholder="メールアドレス"
          />
          <input
            class="form-control"
            v-model="loginInfo.password"
            type="password"
            minlength="8"
            required
            placeholder="パスワード"
          />
        </div>
        <div class="text-danger">{{ validateMessage }}</div>
        <div class="mt-2">
          <button class="btn btn-primary" type="submit">ログイン</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginRepository, { LoginRequest } from '../apis/LoginRepository';
import { reactive, ref } from 'vue';
import router from '../router';

const loginInfo = reactive<LoginRequest>({
  email: '',
  password: '',
});

/** ログイン処理 */
const validateMessage = ref('');
const login = async () => {
  validateMessage.value = '';

  const errorMessage = await LoginRepository.login(loginInfo);

  if (errorMessage) return (validateMessage.value = errorMessage);

  // ログイン後にトップ画面に遷移
  router.push('/');
};
</script>
