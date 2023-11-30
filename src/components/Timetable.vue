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
    <table class="table table-bordered">
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
            v-for="(dateData, i) in dateDataList"
            @click="openSelectLectureModal(dateData, period)"
          >
            {{ lectureForTimetable[enWeeks[i]][period] }}
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
    @select-lecture="setLecture"
  />
</template>

<script setup lang="ts">
import { Modal } from 'bootstrap';
import SelectLectureModal from './modals/SelectLectureModal.vue';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { getJpNameOfWeek } from '../utils/getJpNameOfWeek';
import { useLectureList } from '../composables/useLectureList';
import { LectureListResponse } from '../apis/LectureRepository';
import { mmdd, toMMDD } from '../utils/toDateString';
import { getModalElement } from '../utils/modal';

const enWeeks: Week[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const periods = 5;

const lectureForTimetable: { [Key in Week]: { [Key in number]: string } } = {
  mon: {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
  },
  tue: {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
  },
  wed: {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
  },
  thu: {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
  },
  fri: {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
  },
  sat: {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
  },
  sun: {
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
  },
};

const selectLectureModal = ref<Modal | null>(null);

const setSelectLectureModal = () => {
  const modalElement = getModalElement('selectLectureModal');

  if (!modalElement) return;

  selectLectureModal.value = new Modal(modalElement);
};

const selectingDateData = ref<DateData | null>(null);
const selectingPeriod = ref<number>(1);
const lectureList = ref<LectureListResponse>([]);

const openSelectLectureModal = async (dateData: DateData, period: number) => {
  selectingDateData.value = dateData;
  selectingPeriod.value = period;

  const composable = useLectureList();
  await composable.setLectureList();

  console.log(dateData, period);

  lectureList.value = composable.lectureList.value;

  setSelectLectureModal();

  selectLectureModal.value?.show();
};

const setLecture = (lecture: Lecture) => {
  console.log(lecture);
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
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const jpWeek = getJpNameOfWeek(date);
    date.setDate(date.getDate() + 1);

    dateData.push({
      year,
      month,
      day,
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
</script>

<style scoped>
.table-cell:hover {
  background-color: #f8f9fa;
}
</style>
