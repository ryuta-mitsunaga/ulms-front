import { ApiFetch } from './ApiFetch';

type Student = {
  id: number;
  name_sei: string;
  name_mei: string;
  email: string;
};
const getStudent = async () => {
  return await ApiFetch<Student>('get', `/api/student`);
};

export default {
  getStudent,
};
