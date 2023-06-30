<template>
  <div
    class="grid h-full cursor-pointer grid-cols-1 grid-rows-[repeat(24,_minmax(3em,_1fr))]"
  >
    <div
      v-for="hour in hours"
      :hour="hour"
      :key="hour"
      class="relative h-[48.8281px] overflow-visible"
    >
      <span class="absolute bottom-[-10.5px] right-1/4 text-black">{{
        hour + ':00'
      }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const hours = 23;
</script>
