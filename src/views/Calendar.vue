<template>
  <div
    class="w-full h-full grid grid-cols-12 grid-rows-[repeat(12,minmax(0,1fr))] bg-white overflow-hidden"
  >
    <Sidebar />
    <!-- Provisory -->
    <div
      class="flex flex-col col-start-4 col-end-12 row-span-2 items-start justify-center gap-4"
    >
      <div class="flex text-black items-end gap-4">
        <p class="text-3xl font-bold leading-7">Jan' 2023</p>
        <div class="flex items-center gap-2">
          <button
            class="bg-gray-300 shadow-md hover:bg-gray-200 active:bg-amber-700/40 active:shadow-sm active:translate-y-[1px] p-1 rounded-full text-white"
            @click="moveBackwards"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M15.125 21.1L6.7 12.7q-.15-.15-.212-.325q-.063-.175-.063-.375t.063-.375q.062-.175.212-.325l8.425-8.425q.35-.35.875-.35t.9.375q.375.375.375.875t-.375.875L9.55 12l7.35 7.35q.35.35.35.862q0 .513-.375.888t-.875.375q-.5 0-.875-.375Z"
              />
            </svg>
          </button>
          <div class="text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="8"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4Q8.65 4 6.325 6.325Q4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0 0q-3.35 0-5.675-2.325Q4 15.35 4 12q0-3.35 2.325-5.675Q8.65 4 12 4q3.35 0 5.675 2.325Q20 8.65 20 12q0 3.35-2.325 5.675Q15.35 20 12 20Z"
              />
            </svg>
          </div>
          <button
            class="bg-gray-300 shadow-md hover:bg-gray-200 active:bg-amber-700/40 active:shadow-sm active:translate-y-[1px] p-1 rounded-full text-white"
            @click="moveForward"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7.15 21.1q-.375-.375-.375-.888q0-.512.375-.887L14.475 12l-7.35-7.35q-.35-.35-.35-.875t.375-.9q.375-.375.888-.375q.512 0 .887.375l8.4 8.425q.15.15.213.325q.062.175.062.375t-.062.375q-.063.175-.213.325L8.9 21.125q-.35.35-.862.35q-.513 0-.888-.375Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="text-black flex items-center justify-between w-full">
        <p class="w-2/5 text-xs">
          Here are all your planned events. You will find information for each
          event and can plan a new one as well
        </p>
        <button
          class="text-white font-bold bg-gray-300 px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 active:bg-amber-700/40 active:shadow-sm active:translate-y-[1px]"
        >
          Add Event
        </button>
      </div>
    </div>
    <!-- Provisory -->
    <Days />
  </div>
</template>

<script lang="ts" setup>
import { getCurrentDates, setDateInterval } from '@/components/utils';
import { useCalendarStore } from '@/stores/calendar';
import Days from '../components/Days.vue';
import Sidebar from '../components/Sidebar.vue';

const store = useCalendarStore();
function moveForward() {
  const forward = setDateInterval(getCurrentDates() as number[], true);
  store.view = forward;
  console.log('forward called', store.view);
}

function moveBackwards() {
  const backwards = setDateInterval(getCurrentDates() as number[], true);
  store.view = backwards;
  console.log('backward called', store.view);
}
</script>
