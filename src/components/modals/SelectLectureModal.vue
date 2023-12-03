<template>
  <div>
    <DefaultModal :title="title" modal-id="selectLectureModal" :is-show-footer="!!selectingLecture" @close="close">
      <template v-if="selectingLecture" v-slot:header>
        <TextLabel
          class="ms-1"
          :text="lectureTypeText"
          :lecture-type="selectingLecture?.lectureType || 1"
          style="width: 20%"
        />
      </template>

      <template v-slot:body>
        <LectureDetail v-if="selectingLecture" :lecture="selectingLecture" />

        <div v-else class="table text-start">
          <div v-if="registeringLecture" class="mb-3">
            <h5 class="text-success fw-bold">登録中の講義</h5>
            <div class="d-flex justify-content-between align-items-center">
              <div class="pointer" @click="showDetail(registeringLecture.lecture)">
                <div>
                  <div>{{ registeringLecture.lecture.title }}</div>
                </div>
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

          <div class="mb-3">
            <h5 class="text-success fw-bold">選択可能講義</h5>

            <div class="text-success fw-bold">必修</div>
            <div v-for="lecture in sortedLectureList.required" :key="lecture.id">
              <div class="d-flex justify-content-between align-items-center">
                <div class="pointer" @click="showDetail(lecture)">{{ lecture.title }}</div>
                <div>
                  <button class="ms-1 btn btn-success btn-sm" @click="registerLecture(lecture)" data-bs-dismiss="modal">
                    登録
                  </button>
                </div>
              </div>
              <hr class="p-0" />
            </div>
          </div>

          <div class="mb-3">
            <div class="text-primary fw-bold">選択必修</div>

            <div v-for="lecture in sortedLectureList.selectRequired" :key="lecture.id">
              <div class="d-flex justify-content-between align-items-center">
                <div class="pointer" @click="showDetail(lecture)">{{ lecture.title }}</div>
                <div>
                  <button class="ms-1 btn btn-success btn-sm" @click="registerLecture(lecture)" data-bs-dismiss="modal">
                    登録
                  </button>
                </div>
              </div>
              <hr class="p-0" />
            </div>
          </div>

          <div class="mb-3">
            <div class="text-secondary fw-bold">自由選択</div>

            <div v-for="lecture in sortedLectureList.free" :key="lecture.id">
              <div class="d-flex justify-content-between align-items-center">
                <div class="pointer" @click="showDetail(lecture)">{{ lecture.title }}</div>
                <div>
                  <button class="ms-1 btn btn-success btn-sm" @click="registerLecture(lecture)" data-bs-dismiss="modal">
                    登録
                  </button>
                </div>
              </div>
              <hr class="p-0" />
            </div>
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
import TextLabel from '../TextLabel.vue';

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

const lectureTypeText = computed(() => {
  switch (selectingLecture.value?.lectureType) {
    case 1:
      return '必修';
    case 2:
      return '選択必修';
    case 3:
      return '自由選択';
    default:
      return '';
  }
});

const filteredLectureList = computed(() => {
  return props.lectureList.filter((lecture) => {
    const lectureSchedule = [
      lecture.monPeriod,
      lecture.tuePeriod,
      lecture.wedPeriod,
      lecture.thuPeriod,
      lecture.friPeriod,
      lecture.satPeriod,
      lecture.sunPeriod,
    ];

    return lectureSchedule[props.weekDate.dayOfWeek].some((period) => period === props.period);
  });
});

const sortedLectureList = computed(() => {
  const requiredLectureList = filteredLectureList.value.filter((lecture) => lecture.lectureType === 1);
  const selectRequiredLectureList = filteredLectureList.value.filter((lecture) => lecture.lectureType === 2);
  const freeLectureList = filteredLectureList.value.filter((lecture) => lecture.lectureType === 3);

  return {
    required: [...requiredLectureList],
    selectRequired: [...selectRequiredLectureList],
    free: [...freeLectureList],
  };
});
</script>

<style scoped></style>
