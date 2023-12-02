import { ref } from 'vue';
import LectureRepository, { LectureListResponse } from '../apis/LectureRepository';

export const useLectureList = () => {
  const lectureList = ref<LectureListResponse>([]);

  const setLectureList = async () => (lectureList.value = await LectureRepository.getLectureList());

  return { lectureList, setLectureList };
};
