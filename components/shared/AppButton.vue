<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  outlined: Boolean,
  icon: {
    type: String,
    default: null,
    required: false,
  },
  loading: {
    type: Boolean,
    default: false,
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
 <button :disabled="props.loading" class="rounded-lg p-2 font-respira transition-all duration-300 flex gap-4 justify-center items-center" :class="classes">
   <NuxtImg v-if="props.icon && !loading" src="icons/Play.svg" :alt="props.label" width="20px" height="20px" />
   <Icon name="line-md:loading-loop" v-if="loading" />
   {{ props.label }}
 </button>
</template>

<style scoped>

</style>