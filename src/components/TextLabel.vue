<template>
  <div>
    <div
      class="border rounded-pill text-truncate px-3 py-1 center fw-bold text-white"
      :class="labelClass"
      style="width: 90%"
    >
      <div style="font-size: 10px">{{ text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { LectureType } from '../apis/LectureRepository';

const props = defineProps<{
  text: string;
  lectureType: LectureType;
}>();

const bgColor = computed(() => {
  switch (props.lectureType) {
    case 1:
      return 'success';
    case 2:
      return 'primary';
    case 3:
      return 'secondary';
    default:
      return 'success';
  }
});

const labelClass = computed(() => [`bg-${bgColor.value}`]);
</script>
