<template>
  <div class="text-start">
    <table class="shadow table table-bordered">
      <thead class="table-light">
        <tr>
          <th />
          <th v-for="week in weeks" scope="col">
            <div style="width: 120px">{{ week }}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="period in periods" :key="period">
          <td style="width: 10%" valign="middle" align="center">
            <div style="width: 50px">{{ period + '限' }}</div>
          </td>
          <td
            class="table-cell pointer"
            v-for="(_, weekIndex) in weeks"
            @click="openSelectLectureModal(weekIndex, period)"
            valign="middle"
            align="center"
          >
            <TextLabel
              v-if="displayLecture(weekIndex, period)"
              :text="displayLecture(weekIndex, period)?.lecture.title || ''"
              :lecture-type="displayLecture(weekIndex, period)?.lecture.lectureType || 1"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <SelectLectureModal
    ref="selectLectureModal"
    v-if="selectingWeek !== undefined"
    :week-index="selectingWeek"
    :period="selectingPeriod"
    :lecture-list="lectureList"
    :registering-lecture="registeringLecture"
    :term-type="props.termType"
    @registered="setLectureListForStudent"
  />
</template>

<script setup lang="ts">
import { Modal } from 'bootstrap';
import SelectLectureModal from './modals/SelectLectureModal.vue';
import { ref, watch } from 'vue';
import { dayOfWeekJp } from '../utils/getJpNameOfWeek';
import { useLectureList } from '../composables/useLectureList';
import LectureRepository, { LectureListResponse, StudentLectureListResponse } from '../apis/LectureRepository';
import { getModalElement } from '../utils/modal';
import TextLabel from './TextLabel.vue';

const props = defineProps<{
  termType: TermType;
}>();

const composable = useLectureList();
composable.setLectureList();

const selectLectureModal = ref<Modal | null>(null);

const setSelectLectureModal = () => {
  const modalElement = getModalElement('selectLectureModal');

  if (!modalElement) return;

  selectLectureModal.value = new Modal(modalElement);
};

const selectingWeek = ref<number>(1);
const selectingPeriod = ref<number>(1);
const lectureList = ref<LectureListResponse>([]);

const registeringLecture = ref<StudentLectureListResponse[number] | undefined>();
/** 講義選択モーダルを開く */
const openSelectLectureModal = async (weekIndex: number, period: number) => {
  selectingWeek.value = weekIndex;
  selectingPeriod.value = period;

  lectureList.value = composable.lectureList.value;

  registeringLecture.value = displayLecture(weekIndex, period);

  setSelectLectureModal();
  selectLectureModal.value?.show();
};

/** 月曜日から金曜日まで */
const weeks = dayOfWeekJp.filter((_, index) => index !== 5 && index !== 6);

/** 生徒が登録した講義リスト */
const lectureListForStudent = ref<StudentLectureListResponse>([]);
const setLectureListForStudent = async () => {
  lectureListForStudent.value = (await LectureRepository.getStudentLectureList(props.termType)) || [];
};

setLectureListForStudent();

const displayLecture = (weekIndex: number, period: number) => {
  return lectureListForStudent.value.find((lecture) => {
    const weekArray = [
      lecture.lecture.monPeriod,
      lecture.lecture.tuePeriod,
      lecture.lecture.wedPeriod,
      lecture.lecture.thuPeriod,
      lecture.lecture.friPeriod,
    ];

    return weekArray[weekIndex]?.includes(period);
  });
};

const periods = 5;

// const TermText = computed(() => {
//   switch (props.termType) {
//     case 1:
//       return '前期';
//     case 2:
//       return '後期';
//     default:
//       return '';
//   }
// });
watch(
  () => props.termType,
  () => {
    setLectureListForStudent();
  },
);
</script>

<style scoped>
.table-cell:hover {
  background-color: #f8f9fa;
}
</style>
