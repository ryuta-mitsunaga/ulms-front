import axios, { Method } from 'axios';

export const ApiFetch = async <T>(method: Method, url: string, requestBody?: unknown) => {
  const config = {
    method,
    url: `${import.meta.env.VITE_BASE_URL}${url}`,
    data: requestBody ?? {},
  };

  const axiosPost = axios.create({
    withCredentials: true,
  });

  const response = await axiosPost(config);

  return response.data as T;
};
