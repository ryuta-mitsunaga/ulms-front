import { HttpStatusCode } from 'axios';
import { ApiFetch } from './ApiFetch';

export type LoginRequest = { email: string; password: string };
export type LoginResponse = { statusCode: HttpStatusCode; message: string };
const login = async (request: LoginRequest) => {
  return ApiFetch('get', '/sanctum/csrf-cookie').then(async (res) => {
    console.log(res);
    await ApiFetch<LoginResponse>('post', '/api/login', request);
  });
};

const logout = () => ApiFetch<void>('post', '/api/logout');

export default {
  login,
  logout,
};
