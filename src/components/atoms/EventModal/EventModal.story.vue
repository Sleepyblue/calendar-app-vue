<script setup lang="ts">
import EventModal from './';
import { logEvent } from 'histoire/client';
</script>

<template>
  <Story group="atoms" title="Event Modal">
    <Variant title="Default">
      <EventModal
        show
        disabled
        @close="logEvent('Emitting close modal', $event)"
      />
    </Variant>
  </Story>
</template>
