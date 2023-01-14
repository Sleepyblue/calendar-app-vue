<template>
  <div class="top-0 left-0 sticky h-[5%] px-1 bg-white">
    <span class="text-black">{{ date }}</span>
    <span
      v-if="!isBlank"
      class="w-11/12 h-[3px] rounded-full bg-gray-200 bottom-0 left-0 absolute"
    ></span>
    <EventHeader v-if="!isBlank" />
  </div>
</template>

<script lang="ts" setup>
import EventHeader from './EventHeader.vue';

const props = defineProps({
  isBlank: Boolean,
  date: String,
});
</script>
