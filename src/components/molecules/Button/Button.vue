<template>
  <button>
    <slot>
      <IconLoader v-if="icon" :name="icon" :size="size" />
    </slot>
  </button>
</template>

<script setup lang="ts">
import IconLoader from '@/components/atoms/IconLoader';

defineProps<{
  icon?: string;
  size?: number;
}>();
</script>
