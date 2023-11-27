<template>
  <div>
    <table class="table table-bordered">
      <thead class="table-light">
        <tr>
          <th />
          <th v-for="week in weeks" scope="col">{{ week }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="period in periods" :key="period">
          <td style="width: 10%">{{ period + '限目' }}</td>
          <td class="pointer table-cell" v-for="week in weeks" @click="openSelectLectureModal(week, period)">
            {{ lectureForTimetable[week][period] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <SelectLectureModal
    ref="selectLectureModal"
    :week="selectingWeek"
    :period="selectingPeriod"
    @select-lecture="setLecture"
  />
</template>

<script setup lang="ts">
import { Modal } from 'bootstrap';
import SelectLectureModal from './modals/SelectLectureModal.vue';
import { ref } from 'vue';

const weeks: Week[] = ['月', '火', '水', '木', '金'];
const periods = 5;

const lectureForTimetable: { [Key in Week]: { [Key in number]: string } } = {
  月: {
    1: '経済基礎演習Ⅰ',
    2: '経済基礎演習Ⅱ',
    3: 'ミクロ経済学',
    4: 'マクロ経済学',
    5: '経済学のための数学',
  },
  火: {
    1: 'データ処理入門',
    2: '経済専門演習Ⅰ',
    3: '経済専門演習Ⅱ',
    4: '経済専門演習Ⅲ',
    5: '経済専門演習Ⅳ',
  },
  水: {
    1: 'ミクロ経済学',
    2: 'マクロ経済学',
    3: '経済学のための数学',
    4: 'データ処理入門',
    5: '現代経済入門',
  },
  木: {
    1: '西洋経済史入門',
    2: '日本経済史入門',
    3: '経済思想入門',
    4: '経済統計入門',
    5: '国際経済入門',
  },
  金: {
    1: 'ミクロ経済学特論',
    2: 'マクロ経済学特論',
    3: '',
    4: '',
    5: '',
  },
};

const getModalElement = (modalId: string) => document.querySelector<Element>(`div#${modalId}`);

const selectingWeek = ref<Week>('月');
const selectingPeriod = ref<number>(1);

const openSelectLectureModal = (week: Week, period: number) => {
  selectingWeek.value = week;
  selectingPeriod.value = period;

  const modalELement = getModalElement('selectLectureModal');

  if (!modalELement) return;

  const selectLectureModal = new Modal(modalELement);
  selectLectureModal.show();
};

const setLecture = (lecture: string) => {
  console.log(lecture);
};
</script>

<style scoped>
.table-cell:hover {
  background-color: #f8f9fa;
}
</style>
