<template>
  <div class="bg-pink-300 top-0 left-0 sticky h-[5%]">{{ date }}</div>
</template>

<script lang="ts" setup>
const props = defineProps({
  date: String,
});
</script>
