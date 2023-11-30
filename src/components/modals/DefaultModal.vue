<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" :id="modalId" tabindex="-1" :aria-labelledby="modalLabelId" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" :id="modalLabelId">{{ title }}</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="$emit('close')"
            ></button>
          </div>
          <div class="modal-body"><slot name="body" /></div>
          <div v-if="isShowFooter" class="modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    title: string;
    modalId: string;
    isShowFooter: boolean;
  }>(),
  {
    isShowFooter: false,
  },
);

defineEmits(['close']);

const modalLabelId = computed(() => `${props.modalId} + 'label'`);
</script>
