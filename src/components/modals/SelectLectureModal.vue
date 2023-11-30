<template>
  <div>
    <DefaultModal :title="title" modal-id="selectLectureModal" :is-show-footer="!!selectingLecture" @close="close">
      <template v-slot:body>
        <LectureDetail v-if="selectingLecture" :lecture="selectingLecture" />

        <div v-else class="table text-start">
          <div v-for="lecture in lectureList" :key="lecture.id">
            <div class="d-flex justify-content-between align-items-center">
              <div>{{ lecture.title }}</div>
              <div>
                <button class="btn btn-primary btn-sm" @click="showDetail(lecture)">詳細</button>
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
import LectureRepository, { Lecture, LectureListResponse } from '../../apis/LectureRepository';
import { toMMDD } from '../../utils/toDateString';
import { computed, ref } from 'vue';
import LectureDetail from '../LectureDetail.vue';

const props = defineProps<{
  weekDate: DateData;
  period: number;
  lectureList: LectureListResponse;
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

const registerLecture = async (lecture: Lecture, studentId: number = 1) => {
  const request = {
    registerDate: `${props.weekDate.year}-${props.weekDate.month}-${props.weekDate.day}`,
    period: props.period,
  };
  await LectureRepository.registerStudentLecture(studentId, lecture.id, request);

  emit('registered');
};
</script>

<style scoped>
.pointer:hover {
  background-color: #f8f9fa;
}
</style>
