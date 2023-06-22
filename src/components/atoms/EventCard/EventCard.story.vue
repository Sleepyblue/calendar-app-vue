<script setup lang="ts">
import EventCard from './';

function initState() {
  return {
    eventDate: '2023-06-22',
    eventId: 'event-id',
    eventTitle: 'Test Event Card',
    eventStartHour: 10,
    eventEndHour: 10,
  };
}
</script>

<template>
  <Story
    group="atoms"
    title="Event Card"
    icon="solar:calendar-minimalistic-line-duotone"
    :init-state="initState"
    :layout="{
      type: 'grid',
      width: '300px',
    }"
  >
    <Variant title="Displaying a single hour" v-slot="{ state }">
      <div class="h-24">
        <EventCard v-bind="state" class="pointer-events-none" />
      </div>
    </Variant>
    <Variant title="Displaying an hour range" v-slot="{ state }">
      <div class="h-24">
        <EventCard
          v-bind="state"
          :eventEndHour="14"
          class="pointer-events-none"
        />
      </div>
    </Variant>
    <Variant title="Longer title for a single hour" v-slot="{ state }">
      <div class="h-24">
        <EventCard
          v-bind="state"
          eventTitle="This a longer title for the Test Event card so it shows the ellipsis"
          class="pointer-events-none"
        />
      </div>
    </Variant>
    <Variant title="Longer title for an hour range" v-slot="{ state }">
      <div class="h-24">
        <EventCard
          v-bind="state"
          :eventEndHour="14"
          eventTitle="This a longer title for the Test Event card so it shows the line clamp and ellipsis"
          class="pointer-events-none"
        />
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.back-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(24, minmax(0, 1fr));
  background-image: linear-gradient(
    to bottom,
    rgb(229, 231, 235) 0%,
    transparent 1px,
    transparent 100%
  );
  background-size: 100% 44px;
}
</style>
