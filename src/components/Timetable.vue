<template>
  <div>
    <table class="table">
      <thead class="table-light">
        <tr>
          <th />
          <th v-for="week in weeks" scope="col">{{ week }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(period, i) in periods">
          <td>{{ i + 1 + '限目' }}</td>
          <td v-for="week in weeks">1</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const weeks = ['月', '火', '水', '木', '金'];
const periods = 5;
</script>
