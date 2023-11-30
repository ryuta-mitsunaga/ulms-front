<template>
  <div>
    <div>
      {{ lecture?.description }}
    </div>

    <div class="mt-4">
      <h5 class="text-success fw-bold">開講予定</h5>
      <div>
        <div v-for="(weekScheduled, i) in weekScheduledList">
          <div class="text-start" v-if="weekScheduled.length">
            <div>{{ dayOfWeekJp[i] }}</div>
            <hr class="mb-2" />
            <div>{{ weekScheduled.join(' ') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Lecture } from '../apis/LectureRepository';
import { dayOfWeekJp } from '../utils/getJpNameOfWeek';

const props = defineProps<{
  lecture: Lecture | null;
}>();

const weekScheduledList = computed(() => {
  if (!props.lecture) return [];

  const lecturePeriods = [
    props.lecture.monPeriod,
    props.lecture.tuePeriod,
    props.lecture.wedPeriod,
    props.lecture.thuPeriod,
    props.lecture.friPeriod,
    props.lecture.satPeriod,
    props.lecture.sunPeriod,
  ];

  return lecturePeriods.map((schedule) => {
    return schedule.map((period) => {
      return `${period}限`;
    });
  });
});
</script>

<style scoped>
.pointer:hover {
  background-color: #f8f9fa;
}
</style>
