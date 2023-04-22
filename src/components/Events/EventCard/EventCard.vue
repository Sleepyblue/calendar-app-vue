<template>
  <div
    class="grid-position h-10 w-11/12 rounded-md border-l-8 border-l-amber-300 bg-blue-300 text-sm text-white shadow-md"
  >
    {{ event }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  // implement interface when possible
  event: {},
  hour: {
    type: String,
    required: true,
  },
});

console.log(props.hour);
</script>

<style>
.grid-position {
  grid-row-start: v-bind('props.hour');
  /* grid-row-end: calc(v-bind('props.hour') + 1); */
}
</style>
