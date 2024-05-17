<script setup lang="ts">

</script>

<template>
  <header class="bg-black fixed z-50 top-0 w-full">
    <nav class="h-full flex w-full">
      <ul class="flex justify-between p-6 h-full w-full items-center">
        <li>
          <NuxtLink :to="{name : 'user-profile'}">
            <NuxtImg src="icons/Utilisateur.svg" alt="Profile" width="25" height="25" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{name : 'home'}">
            <NuxtImg src="branding/logotype_blanc.svg" alt="Logo" width="35" height="35" />
          </NuxtLink>
        </li>
        <li>
          <NuxtImg src="icons/Loupe.svg" alt="Recherche" width="25" height="25" />
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  height: 60px;
  box-shadow: 0 -5px 15px 28px #000000;
}
</style>