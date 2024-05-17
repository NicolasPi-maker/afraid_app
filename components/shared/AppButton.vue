<script setup lang="ts">
const props = defineProps({
  label: String,
  outlined: Boolean,
  icon: {
    type: String,
    default: null,
    required: false,
  },
})

const classes = computed(() => {
  return {
    'bg-darkBlood': !props.outlined,
    'text-white': !props.outlined,
    'border border-darkBlood': props.outlined,
  }
})
</script>

<template>
 <button class="rounded-lg p-2 font-respira transition-all duration-300 flex gap-4 justify-center items-center" :class="classes">
   <NuxtImg v-if="props.icon" :src="`/icons/${props.icon}.svg`" :alt="props.label" width="20px" height="20px" />
   {{ props.label }}
 </button>
</template>

<style scoped>

</style>