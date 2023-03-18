<template>
  <div class="sticky top-0 left-0 h-[4%] bg-white px-1">
    <span class="text-black">{{ date }}</span>
    <span
      v-if="!isBlank"
      class="absolute bottom-0 left-0 h-[3px] w-11/12 rounded-full bg-gray-200"
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
