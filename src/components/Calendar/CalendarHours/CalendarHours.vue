<template>
  <div
    class="grid h-full cursor-pointer grid-cols-1 grid-rows-[repeat(24,_minmax(3em,_1fr))]"
  >
    <div class="sticky top-0 left-0 h-[4%] bg-white px-1"></div>
    <div
      v-for="hour in hours"
      :hour="hour"
      :key="hour"
      class="relative h-[48.8281px] overflow-visible"
    >
      <span class="absolute right-1/4 bottom-[-10.5px] text-black">{{
        hour + ':00'
      }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const hours = 23;
</script>
