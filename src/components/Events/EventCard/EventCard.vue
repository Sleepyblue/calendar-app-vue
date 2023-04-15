<template>
  <div
    class="h-10 w-11/12 rounded-md border-l-8 border-l-amber-300 bg-blue-300 text-sm text-white shadow-md"
  >
    {{ event }}
  </div>
</template>

<script lang="ts" setup>
defineProps({
  // implement interface when possible
  event: {},
});
</script>
