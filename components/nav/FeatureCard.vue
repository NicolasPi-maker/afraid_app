<script setup lang="ts">
defineProps({
  imagePath: {
    type: String,
    required: true,
  },
  iconPath: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
  },
  routeName: {
    type: String,
    required: false,
  }
})
</script>

<template>
  <article class="flex flex-col gap-2">
    <div class="feature-wrapper flex rounded-2xl relative justify-center items-center">
      <NuxtLink :to="{name: routeName}">
        <NuxtImg :src="imagePath" class="rounded-2xl object-cover"/>
        <section class="title-wrapper flex flex-col w-full h-full gap-3 items-center justify-center absolute m-auto">
          <NuxtImg :src="iconPath" width="100"/>
          <h2 class="font-marina text-white text-xl">{{ title }}</h2>
          <p v-if="subtitle" class="font-respira font-bold text-blood text-sm text-center">{{ subtitle }}</p>
        </section>
      </NuxtLink>
    </div>
    <p class="font-respira text-gray-300 text-sm p-2">{{ description }}</p>
  </article>
</template>

<style scoped>
.title-wrapper {
  top: 0;
  right: 0;
}

.feature-wrapper {
  box-shadow: 0 0 50px 15px rgba(255,0,0,0.32);
}
</style>