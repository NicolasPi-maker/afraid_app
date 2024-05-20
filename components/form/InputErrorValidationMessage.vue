<script setup lang="ts">
</script>

<template>
  <div class="flex p-2 bg-darkBlood rounded-lg items-center">
    <p class="text-sm text-white font-respira flex-1">
      <slot />
    </p>
    <Icon name="tdesign:error-circle" color="white" size="1.5em" />
  </div>
</template>

<style scoped>

</style>