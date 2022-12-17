<template>
  <div
    class="w-full h-full grid grid-cols-12 grid-rows-[repeat(12,minmax(0,1fr))] bg-[#f8673b] overflow-hidden"
  >
    <Days />
    <Sidebar />
  </div>
</template>

<script lang="ts" setup>
import Days from '../components/Days.vue';
import Sidebar from '../components/Sidebar.vue';
</script>
