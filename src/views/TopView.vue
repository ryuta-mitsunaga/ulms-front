<template>
  <div>
    <div class="d-flex justify-content-between p-2">
      <div>
        <div class="d-flex">
          <div class="form-check me-4">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              v-model="termType"
              :value="1"
            />
            <label class="form-check-label" for="flexRadioDefault1">前期</label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              v-model="termType"
              :value="2"
            />
            <label class="form-check-label" for="flexRadioDefault2">後期</label>
          </div>
        </div>
      </div>
      <div>
        <button class="btn btn-secondary btn-sm me-2" @click="openLectureListModal(false)">登録済みの講義</button>
        <button class="btn btn-primary btn-sm" @click="openLectureListModal(true)">講義一覧から登録</button>
      </div>
    </div>
    <BulkRegisterTimetable v-if="isShow" :term-type="termType" />

    <LectureListModal
      :term-type="termType"
      :lecture-list="lectureList"
      :registering-lecture-list="lectureListForStudent"
      :is-register="isRegister"
      @registered="registeredLecture"
    />
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
import LectureRepository, { LectureListResponse, StudentLectureListResponse } from '../apis/LectureRepository';
import BulkRegisterTimetable from '../components/BulkRegisterTimetable.vue';
import { getModalElement } from '../utils/modal';
import { Modal } from 'bootstrap';
import LectureListModal from '../components/modals/LectureListModal.vue';

const termType = ref<TermType>(1);

const lectureListModal = ref<Modal | null>(null);

const setLectureListModal = () => {
  const modalElement = getModalElement('lectureListModal');

  if (!modalElement) return;

  lectureListModal.value = new Modal(modalElement);
};

const lectureList = ref<LectureListResponse>([]);
const lectureListForStudent = ref<StudentLectureListResponse>([]);
const isRegister = ref<boolean>(false);

const openLectureListModal = async (_isRegister: boolean) => {
  isRegister.value = _isRegister;
  lectureList.value = await LectureRepository.getLectureList();
  lectureListForStudent.value = await LectureRepository.getStudentLectureList(1, termType.value);

  setLectureListModal();

  lectureListModal.value?.show();
};

const isShow = ref<boolean>(true);
const registeredLecture = () => {
  isShow.value = false;

  nextTick(() => {
    isShow.value = true;
  });
};
</script>
