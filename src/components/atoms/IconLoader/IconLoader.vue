<template>
  <component :is="dynamicComponent" />
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue';

const props = defineProps<{
  name: string;
}>();

const dynamicComponent = computed(() => {
  return defineAsyncComponent(
    () => import(`../../../assets/icons/${props.name}.vue`)
  );
});
</script>
