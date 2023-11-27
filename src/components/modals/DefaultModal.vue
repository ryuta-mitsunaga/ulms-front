<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" :id="modalId" tabindex="-1" :aria-labelledby="modalLabelId" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" :id="modalLabelId">{{ title }}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body"><slot name="body" /></div>
          <div class="modal-footer">
            <slot name="footer" />
            <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue';

const props = defineProps<{
  title: string;
  modalId: string;
}>();

const modalLabelId = computed(() => `${props.modalId} + 'label'`);
</script>
