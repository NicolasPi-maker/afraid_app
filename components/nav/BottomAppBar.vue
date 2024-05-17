<script setup lang="ts">
import IconHome from "~/components/icons/IconHome.vue";
import IconLibrary from "~/components/icons/IconLibrary.vue";
import IconCreate from "~/components/icons/IconCreate.vue";
import IconRegister from "~/components/icons/IconRegister.vue";

const route = useRoute();
const isActive = (name: string) => {
  let currentRoute = route.name?.toString() ?? "";
  if(!currentRoute) return false;
  return currentRoute.match(new RegExp(`${name}`));
}
</script>

<template>
  <footer class="fixed bottom-0 w-full z-50 bg-black">
      <nav class="h-full">
        <ul class="grid grid-cols-4 justify-center items-center m-auto">
          <li>
            <NuxtLink :to="{name: 'home'}" class="flex flex-col items-center justify-center gap-2 py-2 text-white">
              <IconHome :fill="isActive('home') ? '#ff0000' : '#ffffff'" height="30" />
              <p class="text-sm font-respira transition-all duration-300" :class="isActive('home') ? 'text-blood font-bold' : '#ffffff'">Accueil</p>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{name: 'story'}" class="flex flex-col items-center justify-center gap-2 py-2 text-white">
              <IconLibrary :fill="isActive('story') ? '#ff0000' : '#ffffff'" height="30" />
              <p class="text-sm font-respira transition-all duration-300" :class="isActive('story') ? 'text-blood font-bold' : '#ffffff'">Parcourir</p>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{name: 'teaser-create'}" class="flex flex-col items-center justify-center gap-2 py-2 text-white">
              <IconCreate :fill="isActive('teaser-create') ? '#ff0000' : '#ffffff'" height="30" />
              <p class="text-sm font-respira transition-all duration-300" :class="isActive('teaser-create') ? 'text-blood font-bold' : '#ffffff'">Créer</p>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{name: 'user-register'}" class="flex flex-col items-center justify-center gap-2 py-2 text-white">
              <IconRegister :fill="isActive('user-register') ? '#ff0000' : '#ffffff'" height="30" />
              <p class="text-sm font-respira transition-all duration-300" :class="isActive('user-register') ? 'text-blood font-bold' : '#ffffff'">Enregistré</p>
            </NuxtLink>
          </li>
        </ul>
      </nav>
  </footer>
</template>

<style scoped>
footer {
  height: 80px;
}
</style>