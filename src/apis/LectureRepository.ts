import { ApiFetch } from './ApiFetch';

// 1: 必修 2: 選択必修　3: 自由選択
export type LectureType = 1 | 2 | 3;

export type Lecture = {
  id: number;
  lectureType: LectureType;
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

const bulkRegisterStudentLecture = async (studentId: number, lectureId: number, termType: TermType) => {
  return await ApiFetch<void>('post', `/api/student/${studentId}/lecture/${lectureId}/bulk?term_type=${termType}`);
};

const removeStudentLecture = async (studentLectureId: number) => {
  return await ApiFetch<void>('delete', `/api/studentLecture/${studentLectureId}`);
};

type StudentLecture = {
  id: number;
  lectureId: number;
  studentId: number;
  registerDate: string;
  period: number;
  termType: TermType;
};
export type StudentLectureListResponse = {
  studentLecture: StudentLecture;
  lecture: Lecture;
}[];
const getStudentLectureList = async (studentId: number, termType: TermType) => {
  return await ApiFetch<StudentLectureListResponse>('get', `/api/student/${studentId}/lecture?term_type=${termType}`);
};

type lectureAggregation = {
  studentId: number;
  attendanceCount: number;
} & { lecture: Lecture };
export type LectureAggregationResponse = lectureAggregation[];
export const getLectureAggregation = async (studentId: number) => {
  return await ApiFetch<LectureAggregationResponse>('get', `/api/student/${studentId}/lectureAggregation`);
};

export default {
  getLectureList,
  registerStudentLecture,
  removeStudentLecture,
  getStudentLectureList,
  bulkRegisterStudentLecture,
};
