<template>
  <div
    class="event-card grid-position flex h-10 w-11/12 items-center justify-center rounded-md border-2 border-l-[6px] border-slate-100 text-sm text-white shadow-md"
  >
    {{ eventTitle }}
  </div>
</template>

<script lang="ts" setup>
const { hour } = defineProps<{
  eventTitle: string;
  hour: string;
}>();
</script>

<style>
.grid-position {
  grid-row-start: v-bind('hour');
}

.event-card {
  background-color: #f5a278;
}
</style>
