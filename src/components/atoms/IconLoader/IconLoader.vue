<template>
  <component :is="dynamicComponent" id="dynamic-icon" />
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue';

const props = defineProps<{
  name: string;
  size?: number;
}>();

const dynamicComponent = computed(() => {
  return defineAsyncComponent(
    () => import(`../../../assets/icons/${props.name}.vue`)
  );
});
</script>

<style>
#dynamic-icon {
  width: v-bind(size + 'px');
  height: v-bind(size + 'px');
}
</style>
