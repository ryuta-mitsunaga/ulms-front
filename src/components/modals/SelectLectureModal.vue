<template>
  <div>
    <DefaultModal :title="`講義選択 (${week}曜日 ${period}限)`" modal-id="selectLectureModal">
      <template v-slot:body>
        <table class="table text-start">
          <thead>
            <tr>
              <th scope="col">講義名</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="requiredLecture in requiredLectures" :key="requiredLecture">
              <td @click="selectLecture(requiredLecture)">
                {{ requiredLecture }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </DefaultModal>
  </div>
</template>

<script setup lang="ts">
import DefaultModal from './DefaultModal.vue';

defineProps<{
  week: Week;
  period: number;
}>();

const emit = defineEmits(['selectLecture']);

const requiredLectures = [
  '経済基礎演習Ⅰ',
  '経済基礎演習Ⅱ',
  'ミクロ経済学',
  'マクロ経済学',
  '経済学のための数学',
  'データ処理入門',
  '経済専門演習Ⅰ',
  '経済専門演習Ⅱ',
  '経済専門演習Ⅲ',
  '経済専門演習Ⅳ',
  'ミクロ経済学',
  'マクロ経済学',
  '経済学のための数学',
  'データ処理入門',
  '現代経済入門',
  '西洋経済史入門',
  '日本経済史入門',
  '経済思想入門',
  '経済統計入門',
  '国際経済入門',
  'ミクロ経済学特論',
  'マクロ経済学特論',
];

const selectLecture = (lecture: string) => {
  emit('selectLecture', lecture);
};
</script>
