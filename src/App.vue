<template>
  <header class="position-fixed w-100">
    <global-header />
    <div id="liveAlertPlaceholder" />
  </header>

  <body style="margin: 0 auto">
    <router-view class="px-5" style="padding-top: 100px" />
  </body>
</template>

<script setup lang="ts">
import GlobalHeader from './components/GlobalHeader.vue';
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>
