<template>
  <button>
    <slot>
      <IconLoader v-if="icon" :name="icon" />
    </slot>
  </button>
</template>

<script setup lang="ts">
import IconLoader from '@/components/atoms/IconLoader';

defineProps<{
  icon?: string;
}>();
</script>
