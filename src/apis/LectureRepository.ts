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

export default {
  getLectureList,
};
