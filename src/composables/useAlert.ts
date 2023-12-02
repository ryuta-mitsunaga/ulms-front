import { Alert } from 'bootstrap';
import { ref } from 'vue';

export const useAlert = () => {
  const alertMessage = ref<string>('aaaaa');
  const alertType = ref<AlertType>('success');

  type AlertType = 'success' | 'danger' | 'warning' | 'info';

  /** アラートを表示する */
  const showAlert = (message: string, closeTimeMsec: number = 2000, type: AlertType = 'success') => {
    alertMessage.value = message;
    alertType.value = type;

    if (closeTimeMsec <= 0) return;

    // アラートを表示する
    appendAlert();

    // アラートを削除する
    setTimeout(() => {
      const alertElement = document.getElementById('liveAlertPlaceholder');
      const alertChildElement = document.querySelector('#liveAlertPlaceholder > div');

      if (!alertElement || !alertChildElement) return;

      alertElement.removeChild(alertChildElement);
    }, closeTimeMsec);
  };

  const appendAlert = () => {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
      `<div class="alert alert-${alertType.value} fade show w-100 position-fixed p-1" role="alert">`,
      `   <div>${alertMessage.value}</div>`,
      '</div>',
    ].join('');

    alertPlaceholder?.append(wrapper);
  };

  return { showAlert, alertMessage, alertType };
};
