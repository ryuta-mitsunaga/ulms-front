<template>
  <header>
    <global-header />
  </header>
  <router-view class="p-5" />
</template>

<script setup lang="ts">
import GlobalHeader from './components/GlobalHeader.vue';
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
