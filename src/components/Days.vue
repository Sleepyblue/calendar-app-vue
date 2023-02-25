<template>
  <div
    class="row-start-3 row-end-[12] col-start-3 col-end-[12] grid-cols-8 grid overflow-y-scroll overflow-x-hidden relative"
  >
    <div class="h-full">
      <Day isBlank class="z-0">
        <template #hours>
          <Hours
            v-for="(hour, index) in hours"
            :hour="index + 1"
            :key="`hour-${index + 1}`"
          />
        </template>
      </Day>
    </div>
    <Day
      class="z-0"
      v-for="(day, index) in weekDates"
      :header="day"
      :index="index"
      :key="`day-${index + 1}`"
      @click.prevent="events"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useCalendarStore } from '@/stores/calendarStore';
import Day from './Day.vue';
import Hours from './Hours.vue';
import { convertToStringDates } from './utils';
import { events } from './events';

const hours = 23;
const store = useCalendarStore();

let weekDates = computed(() => convertToStringDates(store.view, true));
</script>

<style scoped>
*::-webkit-scrollbar {
  width: 6px;
  background-color: transparent;
}

/* *::-webkit-scrollbar-track {
  background: orange;
} */

*::-webkit-scrollbar-thumb {
  background-color: rgb(229, 231, 235);
  border-radius: 50px;
}
</style>
