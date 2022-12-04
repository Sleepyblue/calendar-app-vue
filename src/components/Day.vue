<template>
  <div
    ref="day"
    class="bg-amber-500 m-[1px] grid grid-rows-[repeat(24,_minmax(3em,_1fr))] grid-cols-1 border-t-black back-grid"
  ></div>
</template>

<script lang="ts" setup></script>

<style scoped>
.back-grid {
  background-position-y: 8em;
  background-size: 100% calc(1em + 30px);
  background-position: top;
  background-repeat: repeat-y;
  background-image: linear-gradient(
    to bottom,
    black 0%,
    transparent 1px,
    transparent 100%
  );
}
</style>
