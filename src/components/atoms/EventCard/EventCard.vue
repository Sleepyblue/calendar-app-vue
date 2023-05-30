<template>
  <div
    class="grid-position h-10 w-11/12 rounded-md border-l-8 border-l-amber-800 bg-red-800 text-sm text-white shadow-md"
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
</style>
