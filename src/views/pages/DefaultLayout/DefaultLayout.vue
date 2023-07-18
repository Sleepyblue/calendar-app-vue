<template>
  <div
    id="layout"
    class="h-full w-full overflow-hidden"
    :class="sidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'"
  >
    <Sidebar id="sidebar" />
    <section
      id="view"
      class="relative m-3 flex flex-col gap-4 overflow-hidden rounded-lg bg-slate-100"
    >
      <Header
        @modalStatus="handleHeaderModal"
        @previewStatus="handleHeaderPreview"
      />
      <Calendar
        :isSidebarOpen="sidebarOpen"
        :modalStatus="modalOpen"
        :previewStatus="previewOpen"
        @update:modalStatus="handleHeaderModal"
        @update:previewStatus="handleHeaderPreview"
      />
      <Button class="absolute left-1 top-1 h-6 w-6" @click="sidebarToggle()">
        <IconLoader v-if="sidebarOpen" name="SidebarCollapse" />
        <IconLoader v-else name="SidebarExpand" />
      </Button>
    </section>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from '@/components/organisms/Sidebar';
import Header from '@/components/organisms/Header';
import Calendar from '@/components/organisms/Calendar';
import Button from '@/components/molecules/Button';
import IconLoader from '@/components/atoms/IconLoader';
import { onMounted, onUnmounted, ref } from 'vue';

const sidebarOpen = ref(false);
const modalOpen = ref(false);
const previewOpen = ref(false);

function sidebarToggle() {
  sidebarOpen.value = !sidebarOpen.value;
}

function handleHeaderModal(value: boolean) {
  modalOpen.value = value;
}

function handleHeaderPreview(value: boolean) {
  previewOpen.value = value;
}

//////////////////////
// TODO: Create a Composable

function sidebarToggleListener(event: KeyboardEvent) {
  if (event.key === 'z' && event.ctrlKey && event.altKey) {
    event.preventDefault();
    sidebarToggle();
  }
}

onMounted(() => {
  document.addEventListener('keyup', sidebarToggleListener);
});

onUnmounted(() => {
  document.removeEventListener('keyup', sidebarToggleListener);
});

// Create a Composable
//////////////////////
</script>

<style>
#layout {
  display: grid;
  grid-template-areas: 'sidebar view';
  transition: all 0.3s linear;
}

.sidebar-expanded {
  grid-template-columns: minmax(0, 320px) minmax(0, 1fr);
}

.sidebar-collapsed {
  grid-template-columns: minmax(0, 0) minmax(0, 1fr);
}

#sidebar {
  grid-area: sidebar;
}

#view {
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.25);
  grid-area: view;
}

#header button {
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.15);
}

#header button:hover {
  background-color: rgba(245, 162, 120, 0.4);
}

#header button:active {
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.15);
}
</style>
