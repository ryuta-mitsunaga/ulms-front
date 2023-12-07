import axios, { Method } from 'axios';
import router from '../router';
import { useAlert } from '../composables/useAlert';

export const ApiFetch = async <T>(method: Method, url: string, requestBody?: unknown, hasToken: boolean = true) => {
  const token = localStorage.getItem('token');

  const config = {
    method,
    url: `${import.meta.env.VITE_BASE_URL}${url}`,
    data: requestBody ?? {},
  };

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  if (token || !hasToken) {
    Object.assign(config, { headers });
  } else {
    useAlert().showAlert('タイムアウトしました', 2000, 'danger');
    router.push('login');
  }

  const axiosPost = axios.create({
    withCredentials: true,
    withXSRFToken: true,
  });

  const response = await axiosPost(config).catch((error) => {});

  return response ? (response.data as T) : null;
};
