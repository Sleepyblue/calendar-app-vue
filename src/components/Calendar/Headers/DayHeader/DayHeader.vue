<template>
  <div class="sticky left-0 top-0 h-[4%] px-1">
    <span class="text-white">{{ date }}</span>
    <span
      class="absolute bottom-0 left-0 h-[3px] w-11/12 rounded-full bg-gray-200"
    ></span>
    <EventsHeader />
  </div>
</template>

<script lang="ts" setup>
import EventsHeader from '@/components/Calendar/Headers/EventsHeader';

const props = defineProps({
  date: String,
});
</script>
