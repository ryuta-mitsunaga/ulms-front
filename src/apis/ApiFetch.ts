import axios, { Method } from 'axios';
import router from '../router';

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
    router.push('login');
  }

  const axiosPost = axios.create({
    withCredentials: true,
    withXSRFToken: true,
  });

  const response = await axiosPost(config);

  return response ? (response.data as T) : null;
};
