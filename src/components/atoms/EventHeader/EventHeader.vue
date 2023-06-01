<template>
  <button class="w-11/12 min-w-0 rounded-[4px] bg-[#f5a278] px-2">
    <div class="overflow-hidden whitespace-nowrap text-sm text-white">
      {{ eventTitle }}
    </div>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  eventTitle?: string;
}>();
</script>
