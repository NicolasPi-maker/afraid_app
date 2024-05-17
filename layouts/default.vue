<script setup lang="ts">
import AppBar from "~/components/nav/AppBar.vue";
import BottomAppBar from "~/components/nav/BottomAppBar.vue";
</script>

<template>
  <div>
    <AppBar />
    <main class="overflow-y-auto relative bg-black">
<!--      <NuxtImg src="background_app.jpg" class="h-full w-full background-app absolute" />-->
      <slot />
    </main>
    <BottomAppBar />
  </div>
</template>

<style scoped>
main {
  margin-top: 80px;
  height: calc(100vh - (80px + 80px));
  box-sizing: border-box;
}

.background-app {
  z-index: -1;
  object-fit: cover;
  opacity: 0.2;
}
</style>