import { ApiFetch } from './ApiFetch';

export type LoginRequest = { email: string; password: string };
export type LoginResponse = { token: string };
const login = async (request: LoginRequest) => {
  const res = await ApiFetch<LoginResponse>('post', '/api/login', request, false);

  if (res?.token === undefined) {
    return 'ログインに失敗しました。';
  }

  localStorage.setItem('token', res.token);
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

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

type ResultResponse = {
  message: string;
  statusCode: number;
};
const changePassword = async (request: ChangePasswordRequest) => {
  return await ApiFetch<ResultResponse>('post', '/api/changePassword', request);
};

export default {
  login,
  logout,
  getStudent,
  changePassword,
};
