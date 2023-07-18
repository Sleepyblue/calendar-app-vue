<template>
  <PositionedModalTemplate
    focusOnElement="button"
    id="event-display"
    class="absolute z-20 h-max w-96 overflow-hidden rounded-md bg-slate-100"
    :class="[
      { 'card-translateX': horizontalPosition === 'right' },
      { 'card-translateY': translate },
      { 'card-translate': horizontalPosition === 'right' && translate },
    ]"
    @close="emit('close', true)"
  >
    <template #header>
      <header class="flex justify-end gap-2 bg-[#f5e178] p-1">
        <Button
          icon="Edit"
          :size="20"
          class="display-button relative z-10 rounded-md p-[2px] text-[#F5788D] hover:text-white focus-visible:text-white outline-none"
          @click.prevent="handleEditModal"
        />
        <Button
          icon="Trash"
          :size="20"
          class="display-button relative z-10 rounded-md p-[2px] text-[#F5788D] hover:text-white focus-visible:text-white outline-none"
          @click.prevent="handleDelete"
        />
        <Button
          icon="Close"
          :size="20"
          class="display-button relative z-10 rounded-md p-[2px] text-[#F5788D] hover:text-white focus-visible:text-white outline-none"
          @click.pevent="closeDisplay"
        />
      </header>
    </template>
    <section class="flex flex-col gap-2">
      <h2 class="text-lg font-semibold">{{ title }}</h2>
      <div class="flex justify-start gap-8 text-sm text-gray-500">
        <span class="flex items-center gap-2">
          <IconLoader name="Calendar" :size="14" class="text-gray-400" />
          <p>{{ parsedDate }}</p>
        </span>
        <span class="flex items-center gap-2">
          <IconLoader name="Clock" :size="14" class="text-gray-400" />
          <p>{{ hourRange }}</p>
        </span>
      </div>
    </section>
    <hr />
    <section class="flex flex-col gap-2">
      <h2 class="text-lg font-semibold">Description</h2>
      <p class="text-sm text-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis aut
        placeat quos ex numquam sed dolores facilis atque exercitationem,
        corporis ipsum magnam aperiam! Ullam sint praesentium sit architecto
        suscipit vitae?
      </p>
    </section>
  </PositionedModalTemplate>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import PositionedModalTemplate from '@/components/templates/PositionedModalTemplate';
import Button from '@/components/molecules/Button';
import IconLoader from '@/components/atoms/IconLoader';
import { useCalendarStore } from '@/stores/calendarStore';
import { formatHoursRange } from '@/utils/Hours';
import { convertDateToShortForm } from '@/utils/Dates';

const {
  id,
  offsetTop,
  offsetLeft,
  offsetWidth,
  horizontalPosition,
  translate,
} = defineProps<{
  id?: string;
  offsetTop: number;
  offsetLeft: number;
  offsetWidth: number;
  horizontalPosition: string;
  translate: boolean;
}>();

const emit = defineEmits<{
  (e: 'close', show: boolean): void;
  (e: 'openEditModal', id: string): void;
}>();

const store = useCalendarStore();
const deleteEvent = store.deleteEvent;
const findEvent = store.findWeekViewEvent;

const title = ref();
const date = ref();
const startHour = ref();
const endHour = ref();

const offsetSum = computed(() => {
  if (horizontalPosition === 'left') return offsetLeft + offsetWidth;
  else return offsetLeft;
});

const hourRange = computed(() =>
  formatHoursRange(startHour.value, endHour.value, true),
);

const parsedDate = computed(() => convertDateToShortForm(date.value));

function handleEditModal() {
  emit('openEditModal', id!);
  closeDisplay();
}

function handleDelete() {
  closeDisplay();
  deleteEvent(id!);
}

function closeDisplay() {
  emit('close', true);
}

onMounted(() => {
  const event = findEvent(id!);
  title.value = event?.title;
  date.value = event?.date;
  startHour.value = event?.startHour;
  endHour.value = event?.endHour;
});
</script>

<style>
#event-display {
  top: v-bind(offsetTop + 'px');
  left: v-bind(offsetSum + 'px');
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  transition: all 0.15s linear;
}

.card-translateX {
  transform: translateX(-108%);
}

.card-translateY {
  transform: translateY(-100%);
}

.card-translate {
  transform: translate(-108%, -100%);
}

.display-button:hover::before,
.display-button:focus-visible::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(100% + 0.2px);
  height: calc(100% + 0.2px);
  transform: translate(-50%, -50%);
  border-radius: 6px;
  background: linear-gradient(120deg, #f5788d, #f5e178, #f5788d);
  background-size: 300% 300%;
  z-index: -1;
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
