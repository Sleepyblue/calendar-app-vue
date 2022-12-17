<!-- TODO: Temporary -->
<template>
  <div class="h-[48.8281px] border-t relative overflow-visible">
    <span class="absolute right-0 bottom-[-10.5px]">{{ hour + ':00' }}</span>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  hour: Number,
});
</script>
