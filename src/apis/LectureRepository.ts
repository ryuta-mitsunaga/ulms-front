import { ApiFetch } from './ApiFetch';

// 0: 必修 1: 選択必修　2: 自由選択
export type LectureType = 0 | 1 | 2;

export type Lecture = {
  id: number;
  lecture_type: [0, 1, 2];
  title: string;
  description: string;
  monPeriod: number[];
  tuePeriod: number[];
  wedPeriod: number[];
  thuPeriod: number[];
  friPeriod: number[];
  satPeriod: number[];
  sunPeriod: number[];
};
export type LectureListResponse = Lecture[];
const getLectureList = async () => {
  return await ApiFetch<LectureListResponse>('get', '/api/lectureList');
};

export type StudentLectureRequest = {
  registerDate: string;
  period: number;
};
const registerStudentLecture = async (studentId: number, lectureId: number, request: StudentLectureRequest) => {
  return await ApiFetch<void>('post', `/api/student/${studentId}/lecture/${lectureId}`, request);
};

type StudentLecture = {
  id: number;
  lectureId: number;
  studentId: number;
  registerDate: string;
  period: number;
};
export type StudentLectureListResponse = {
  studentLecture: StudentLecture;
  lecture: Lecture;
}[];
const getStudentLectureList = async (studentId: number) => {
  return await ApiFetch<StudentLectureListResponse>('get', `/api/student/${studentId}/lecture`);
};

export default {
  getLectureList,
  registerStudentLecture,
  getStudentLectureList,
};
