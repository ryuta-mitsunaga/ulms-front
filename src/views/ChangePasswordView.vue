<template>
  <div style="width: 500px; margin: auto">
    <div>
      <form @submit.prevent="changePassword">
        <div>
          <input
            class="form-control mb-1"
            v-model="passwordInfo.currentPassword"
            type="password"
            required
            placeholder="現在のパスワード"
            minlength="8"
          />
          <input
            class="form-control"
            v-model="passwordInfo.newPassword"
            type="password"
            required
            placeholder="新しいパスワード"
            minlength="8"
          />
        </div>
        <div class="text-danger">{{ validateMessage }}</div>
        <div class="mt-2">
          <button class="btn btn-secondary me-1" @click="back">戻る</button>
          <button class="btn btn-success" type="submit">パスワード変更</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginRepository, { ChangePasswordRequest } from '../apis/LoginRepository';
import { reactive, ref } from 'vue';
import router from '../router';
import { useAlert } from '../composables/useAlert';

const passwordInfo = reactive<ChangePasswordRequest>({
  currentPassword: '',
  newPassword: '',
});

const validateMessage = ref('');
const changePassword = async () => {
  validateMessage.value = '';
  const res = await LoginRepository.changePassword(passwordInfo);

  if (res?.statusCode !== 200) return (validateMessage.value = res?.message || '');

  await LoginRepository.logout();
  useAlert().showAlert('パスワードを変更しました');
  router.push('/login');
};

const back = () => router.push('/');
</script>
