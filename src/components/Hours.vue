<!-- TODO: Temporary -->
<template>
  <div class="relative h-[48.8281px] overflow-visible">
    <span class="absolute right-1/4 bottom-[-10.5px] text-black">{{
      hour + ':00'
    }}</span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  hour: Number,
});
</script>
