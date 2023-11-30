import axios, { HttpStatusCode } from 'axios';
import { ApiFetch } from './ApiFetch';

export type LoginRequest = { email: string; password: string };
export type LoginResponse = { statusCode: HttpStatusCode; message: string };
const login = async (request: LoginRequest) => {
  await ApiFetch('get', '/sanctum/csrf-cookie');

  return await ApiFetch<LoginResponse>('post', '/api/login', request);
};

const logout = async () => {
  await ApiFetch<void>('post', '/api/logout');
};

export default {
  login,
  logout,
};
