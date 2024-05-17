<script setup lang="ts">
defineProps({
  name: String,
  fill: {
    type: String,
    default: "#ffffff",
  },
  fillHover: {
    type: String,
    default: "var(--color-primary)",
  },
  height: {
    type: String,
    default: "50px",
  },
  width: {
    type: String,
    default: "50px",
  },
});
</script>

<template>
  <svg :height="height" :width="width" id="Calque_2" data-name="Calque 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 30.94" class="cursor-pointer">
    <slot :fill="fill" :fillHover="fillHover" />
  </svg>
</template>