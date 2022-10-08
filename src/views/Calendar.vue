<script setup lang="ts">
import Day from "../components/Day.vue";
import Sidebar from "../components/Sidebar.vue";
</script>

<template>
  <div
    class="w-[90%] h-[90%] grid grid-cols-12 grid-rows-[repeat(12,minmax(0,1fr))] bg-[#f8673b] overflow-hidden rounded-[20px]"
  >
    <Sidebar />
    <Day />
  </div>
</template>
