<template>
  <div>
    {{ dateDataList[0].year }}
    <div class="d-flex justify-content-between">
      <div>
        <i @click="changeWeek(true)" class="bi bi-caret-left-fill pointer"></i>
      </div>

      <div>
        {{ dateDataStringArray[0] }} ~
        {{ dateDataStringArray[6] }}
      </div>
      <div>
        <i @click="changeWeek()" class="bi bi-caret-right-fill pointer"></i>
      </div>
    </div>
    <table class="shadow table table-bordered">
      <thead class="table-light">
        <tr>
          <th />
          <th v-for="dateDataString in dateDataStringArray" scope="col">{{ dateDataString }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="period in periods" :key="period">
          <td style="width: 10%">{{ period + '限' }}</td>
          <td
            class="pointer table-cell"
            v-for="dateData in dateDataList"
            @click="openSelectLectureModal(dateData, period)"
          >
            {{ displayLecture(dateData, period)?.lecture.title || '' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <SelectLectureModal
    ref="selectLectureModal"
    v-if="selectingDateData"
    :week-date="selectingDateData"
    :period="selectingPeriod"
    :lecture-list="lectureList"
    :registering-lecture="registeringLecture"
    @registered="setLectureListForStudent"
  />
</template>

<script setup lang="ts">
import { Modal } from 'bootstrap';
import SelectLectureModal from './modals/SelectLectureModal.vue';
import { computed, ref } from 'vue';
import { getJpNameOfWeek } from '../utils/getJpNameOfWeek';
import { useLectureList } from '../composables/useLectureList';
import LectureRepository, { LectureListResponse, StudentLectureListResponse } from '../apis/LectureRepository';
import { paddingToZero, toMMDD } from '../utils/toDateString';
import { getModalElement } from '../utils/modal';

const periods = 5;

const selectLectureModal = ref<Modal | null>(null);

const setSelectLectureModal = () => {
  const modalElement = getModalElement('selectLectureModal');

  if (!modalElement) return;

  selectLectureModal.value = new Modal(modalElement);
};

const selectingDateData = ref<DateData | null>(null);
const selectingPeriod = ref<number>(1);
const lectureList = ref<LectureListResponse>([]);

const registeringLecture = ref<StudentLectureListResponse[number] | undefined>();
/** 講義選択モーダルを開く */
const openSelectLectureModal = async (dateData: DateData, period: number) => {
  selectingDateData.value = dateData;
  selectingPeriod.value = period;

  const composable = useLectureList();
  await composable.setLectureList();

  lectureList.value = composable.lectureList.value;

  registeringLecture.value = displayLecture(dateData, period);

  setSelectLectureModal();

  selectLectureModal.value?.show();
};

const currentMon = ref(0);

/** 現在の週の月曜日から金曜日までの日付を取得する */
const dateDataList = computed(() => {
  const dateData: DateData[] = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date();

    // 日付を取得
    date.setDate(date.getDate() - date.getDay() + i + 1 + currentMon.value);

    const year = date.getFullYear();
    const month = paddingToZero(date.getMonth() + 1);
    const day = paddingToZero(date.getDate());
    const dayOfWeek = date.getDay();

    const jpWeek = getJpNameOfWeek(date);

    dateData.push({
      year,
      month,
      day,
      dayOfWeek,
      jpWeek,
    });
  }

  return dateData;
});

/** 日付の文字列リスト */
const dateDataStringArray = computed(() => dateDataList.value.map(toMMDD));

const changeWeek = (isBack: boolean = false) => {
  if (isBack) {
    currentMon.value -= 7;
  } else {
    currentMon.value += 7;
  }
};

/** 生徒が登録した講義リスト */
const lectureListForStudent = ref<StudentLectureListResponse>([]);
const setLectureListForStudent = async () => {
  lectureListForStudent.value = await LectureRepository.getStudentLectureList(1);
};

setLectureListForStudent();

const displayLecture = (dateData: DateData, period: number) => {
  return lectureListForStudent.value.find((lecture) => {
    const matchDate = lecture.studentLecture.registerDate === `${dateData.year}-${dateData.month}-${dateData.day}`;

    return lecture.studentLecture.period === period && matchDate;
  });
};
</script>

<style scoped>
.table-cell:hover {
  background-color: #f8f9fa;
}
</style>
