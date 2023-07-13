<template>
  <InputTemplate
    label="title"
    iconName="Title"
    :error="error"
    errorMessage="Please, enter a title"
  >
    <input
      ref="titleRef"
      type="text"
      name="title"
      placeholder="Add a title"
      class="w-full rounded-t-md bg-transparent p-1 outline-none focus:bg-slate-200"
      :value="title"
      @input="handleEmit($event)"
      @focusout="isFieldValid"
      @change="isFieldValid"
      required
    />
  </InputTemplate>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputTemplate from '@/components/templates/InputTemplate';

const { title } = defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  (e: 'update:title', value: string): void;
  (e: 'invalidField', value: { title: boolean }): void;
}>();

const error = ref(false);

function isFieldValid() {
  if (title === '') {
    error.value = true;
  } else {
    error.value = false;
  }

  emit('invalidField', { title: error.value });
}

function handleEmit(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:title', target.value);
}
</script>
