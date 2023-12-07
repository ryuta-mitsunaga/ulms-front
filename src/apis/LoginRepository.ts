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

type Student = {
  id: number;
  name_sei: string;
  name_mei: string;
  email: string;
  password: string;
};
const getStudent = async (studentId: number) => {
  return await ApiFetch<Student>('get', `/api/student/${studentId}`);
};

export default {
  login,
  logout,
  getStudent,
};
