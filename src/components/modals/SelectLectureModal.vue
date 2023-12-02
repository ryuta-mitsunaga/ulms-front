<template>
  <div>
    <DefaultModal :title="title" modal-id="selectLectureModal" :is-show-footer="!!selectingLecture" @close="close">
      <template v-slot:body>
        <LectureDetail v-if="selectingLecture" :lecture="selectingLecture" />

        <div v-else class="table text-start">
          <div v-if="registeringLecture" class="mb-3">
            <h5 class="text-success fw-bold">登録中の講義</h5>
            <div class="d-flex justify-content-between align-items-center">
              <div class="pointer" @click="showDetail(registeringLecture.lecture)">
                {{ registeringLecture.lecture.title }}
              </div>
              <div>
                <button
                  class="ms-1 btn btn-danger btn-sm"
                  @click="removeLecture(registeringLecture.studentLecture.id)"
                  data-bs-dismiss="modal"
                >
                  削除
                </button>
              </div>
            </div>
            <hr />
          </div>

          <h5 class="text-success fw-bold">選択可能講義</h5>
          <div v-for="lecture in lectureList" :key="lecture.id">
            <div class="d-flex justify-content-between align-items-center">
              <div class="pointer" @click="showDetail(lecture)">{{ lecture.title }}</div>
              <div>
                <button class="ms-1 btn btn-success btn-sm" @click="registerLecture(lecture)" data-bs-dismiss="modal">
                  登録
                </button>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <button class="btn btn-secondary" @click="selectingLecture = null">戻る</button>
      </template>
    </DefaultModal>
    <LectureDetailModal :lecture="selectingLecture" />
  </div>
</template>

<script setup lang="ts">
import DefaultModal from './DefaultModal.vue';
import LectureRepository, {
  Lecture,
  LectureListResponse,
  StudentLectureListResponse,
} from '../../apis/LectureRepository';
import { toMMDD } from '../../utils/toDateString';
import { computed, inject, ref } from 'vue';
import LectureDetail from '../LectureDetail.vue';
import { useAlert } from '../../composables/useAlert';

const props = defineProps<{
  weekDate: DateData;
  period: number;
  lectureList: LectureListResponse;
  registeringLecture: StudentLectureListResponse[number] | undefined;
}>();

const emit = defineEmits(['registered']);

const showDetail = (lecture: Lecture) => {
  selectingLecture.value = lecture;
};

const title = computed(() => selectingLecture.value?.title ?? `${toMMDD(props.weekDate)} ${props.period}限`);

const selectingLecture = ref<Lecture | null>(null);

const close = () => {
  selectingLecture.value = null;
};

const alertComposable = useAlert();

const registerLecture = async (lecture: Lecture, studentId: number = 1) => {
  const request = {
    registerDate: `${props.weekDate.year}-${props.weekDate.month}-${props.weekDate.day}`,
    period: props.period,
  };
  await LectureRepository.registerStudentLecture(studentId, lecture.id, request);
  alertComposable.showAlert('授業を登録しました');

  emit('registered');
};

const removeLecture = async (studentLectureId: number) => {
  await LectureRepository.removeStudentLecture(studentLectureId);
  alertComposable.showAlert('授業を削除しました');

  emit('registered');
};
</script>

<style scoped></style>
