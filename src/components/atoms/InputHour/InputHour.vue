<template>
  <label for="" class="hour-label relative w-full">
    <input
      ref="hourRef"
      type="number"
      :min="startHour || 0"
      max="24"
      :placeholder="placeholder"
      class="hour-input w-full rounded-t-md bg-slate-100 p-1 outline-none focus:bg-slate-200"
      :value="hour"
      @input="handleEmit($event)"
      required
    />
  </label>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const { startHour } = defineProps<{
  hour?: number;
  startHour?: number;
}>();

const emit = defineEmits<{
  (e: 'update:hour', value: number): void;
}>();

const hourRef = ref<HTMLInputElement | null>(null);
const placeholder = computed(() => {
  if (startHour) return `Event begins`;
  else return `Event ends`;
});

function handleEmit(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:hour', +target.value);
}

defineExpose({
  hourRef,
});
</script>

<style>
.hour-label:has(.hour-input:focus)::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  border-radius: 50px;
  background: linear-gradient(120deg, #f5788d, #f5e178, #f5788d);
  background-size: 300% 300%;
  animation: gradient-animation 4s ease-in-out infinite;
}

@keyframes gradient-animation {
  0% {
    background-position: 15% 0%;
  }
  50% {
    background-position: 85% 100%;
  }
  100% {
    background-position: 15% 0%;
  }
}
</style>
