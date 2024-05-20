<script setup lang="ts">
import AppButton from "~/components/shared/AppButton.vue";
import "/node_modules/flag-icons/css/flag-icons.min.css";

definePageMeta({
  layout: false,
})
const languages = ref([]);
const loading = ref(true);
const appLanguage = useState('appLanguage', () => 'FR');

const {getLanguages} = useLanguage();

onMounted(async () => {
  try {
    const response = await getLanguages();
    languages.value = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});
const isOpen = ref(true);
</script>

<template>
  <main class="home-app-wrapper flex items-center flex-col relative">
    <NuxtImg src="branding/logo_blanc.svg" alt="Logo" class="flex-1 m-3" width="250" height="250" />
    <section class="flex flex-col items-center justify-center w-full">
      <div class="flex gap-2 m-3">
        <p class="font-respira">Choix de langue</p>
        <span :class="`flag fi fi-${appLanguage.toLowerCase()}`"></span>
      </div>
      <USelect
          size="md"
          :loading="loading"
          v-model="appLanguage"
          :options="languages"
          :placeholder="appLanguage"
          option-attribute="code"
          value-attribute="code"
      >
      </USelect>
      <NuxtLink :to="{name: 'home'}" class="my-12 w-2/3">
        <AppButton label="Commencer" class="w-full text-xl" />
      </NuxtLink>
    </section>
    <UModal v-model="isOpen" prevent-close :ui="{background: 'glass bg-red-500', margin: 'm-3', container: 'items-center'}">
      <div class="p-6 flex flex-col items-center justify-center gap-3 m-3">
        <p class="flex-1 text-base font-respira">GetAfraid est une application avec des contenus pouvant choquer les plus jeunes.
          Il est conseillé d’avoir au minimum 16 ans pour utiliser l’application. Nous sommes désolés pour cette nouvelle, à bientôt.
        </p>
        <AppButton label="J'ai compris" class="mt-6 w-2/3 text-base glass py-4" @click="isOpen = false" />
      </div>
    </UModal>
  </main>
</template>

<style scoped>
@import "assets/css/main.css";

.home-app-wrapper {
  height: 100vh;
  background-image: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url("/background_app.jpg");

}

.background-app {
  z-index: -1;
  object-fit: cover;
  opacity: 0.2;
}
</style>