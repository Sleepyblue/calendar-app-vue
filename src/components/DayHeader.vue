<template>
  <div class="top-0 left-0 sticky h-[5%] mx-[2px] bg-white">
    <span class="text-black">{{ date }}</span>
    <span
      v-if="!isBlank"
      class="w-11/12 h-[3px] rounded-full bg-gray-200 bottom-0 left-0 absolute"
    ></span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  isBlank: Boolean,
  date: String,
});
</script>
