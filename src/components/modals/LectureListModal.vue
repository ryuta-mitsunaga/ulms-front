<template>
  <div>
    <DefaultModal
      :title="title"
      modal-id="lectureListModal"
      :is-show-footer="!!selectingLecture"
      @close="selectingLecture = null"
    >
      <template v-if="selectingLecture" v-slot:header>
        <TextLabel
          class="ms-1"
          :text="lectureTypeText(selectingLecture.lectureType)"
          :lecture-type="selectingLecture?.lectureType || 1"
          style="width: 20%"
        />
      </template>

      <template v-slot:body>
        <LectureDetail v-if="selectingLecture" :lecture="selectingLecture" />

        <div v-else>
          <div v-if="sortedLectureList.length">
            <div class="mb-2" v-for="lecture in sortedLectureList" :key="lecture.id">
              <div class="d-flex justify-content-between align-items-center">
                <div class="pointer" @click="selectingLecture = lecture">
                  <div class="d-flex p-1">
                    <div>
                      <TextLabel
                        class="me-1"
                        :text="lectureTypeText(lecture?.lectureType || 1)"
                        :lecture-type="lecture?.lectureType || 1"
                        style="width: 100px"
                      />
                    </div>

                    <span>{{ lecture.title }}</span>
                  </div>
                </div>
                <div v-if="isRegister">
                  <button class="ms-1 btn btn-success btn-sm" @click="registerLecture(lecture)" data-bs-dismiss="modal">
                    登録
                  </button>
                </div>
              </div>
              <hr class="p-0" />
            </div>
          </div>
          <div class="text-start" v-else>未登録</div>
        </div>
      </template>
      <template v-slot:footer>
        <button class="btn btn-secondary" @click="selectingLecture = null">戻る</button>
      </template>

      <LectureDetail v-if="selectingLecture" :lecture="selectingLecture" />
    </DefaultModal>
  </div>
</template>

<script setup lang="ts">
import DefaultModal from './DefaultModal.vue';
import LectureRepository, {
  Lecture,
  LectureListResponse,
  LectureType,
  StudentLectureListResponse,
} from '../../apis/LectureRepository';
import { computed, ref } from 'vue';
import LectureDetail from '../LectureDetail.vue';
import { useAlert } from '../../composables/useAlert';
import TextLabel from '../TextLabel.vue';

const props = defineProps<{
  lectureList: LectureListResponse;
  registeringLectureList: StudentLectureListResponse;
  termType: TermType;
  isRegister: boolean;
}>();

const emit = defineEmits(['registered']);

const selectingLecture = ref<Lecture | null>(null);

const sortedLectureList = computed(() => {
  if (!props.isRegister) return props.registeringLectureList.map((registeringLecture) => registeringLecture.lecture);

  return props.lectureList.filter((lecture) => {
    return !props.registeringLectureList.some((registeringLecture) => registeringLecture.lecture.id === lecture.id);
  });
});

const alertComposable = useAlert();

const registerLecture = async (lecture: Lecture, studentId: number = 1) => {
  // 前期後期で登録する
  await LectureRepository.bulkRegisterStudentLecture(studentId, lecture.id, props.termType);
  alertComposable.showAlert('授業を登録しました');

  emit('registered');
};

const title = computed(() => {
  let text = props.termType === 1 ? '前期' : '後期';

  if (selectingLecture.value) {
    text = ` ${selectingLecture.value.title}`;
  } else {
    text += props.isRegister ? ' 講義登録' : ' 登録済みの講義';
  }

  return text;
});

const lectureTypeText = (lectureType: LectureType) => {
  switch (lectureType) {
    case 1:
      return '必修';
    case 2:
      return '選択必修';
    case 3:
      return '自由選択';
    default:
      return '';
  }
};
</script>
