<template>
  <div
    class="w-full h-full grid grid-cols-12 grid-rows-[repeat(12,minmax(0,1fr))] bg-[#f8673b] overflow-hidden"
  >
    <div
      class="row-start-3 row-end-[12] bg-blue-500 col-start-4 col-end-[12] grid-cols-7 grid overflow-y-scroll overflow-x-hidden relative"
    >
      <Days />
    </div>
    <Sidebar />
  </div>
</template>

<script lang="ts" setup>
import Days from '../components/Days.vue';
import Sidebar from '../components/Sidebar.vue';
</script>
