<script setup lang="ts">
import AppButton from "~/components/shared/AppButton.vue";
import {usePrompt} from "~/composables/usePrompt";

const onLoading = ref<boolean>(false);
const prompt = useState('prompt',() => '');
const appLanguage = useState('appLanguage',() => 'FR');

const { generateRandomPrompt } = usePrompt();
const generatePrompt = async () => {
  if (!onLoading.value) {
    onLoading.value = true;
    try {
      const response = await generateRandomPrompt(appLanguage.value);
      prompt.value = response.data;
    } catch (error) {
      console.error(error);
    } finally {
      onLoading.value = false;
    }
  }
}

const canGeneratePrompt = computed(() => prompt.value !== '' && !onLoading.value);
</script>

<template>
  <div class="feature-wrapper h-2/3 flex rounded-2xl relative justify-center items-center">
      <NuxtImg class="thumbnail w-full h-full opacity-60 object-cover" src="thumbnails/tell_me.jpg" alt="a old man hold his head with own hands in front of a red candle" />
      <section class="title-wrapper flex flex-col w-full p-6 gap-3 items-center justify-center absolute m-auto">
        <h2 class="font-marina text-white text-xl">PARLE MORTEL</h2>
        <p class="font-respira text-blood text-sm text-center w-full px-4">LIBERE-MOI DE MON ENNUI EN ME SOUMETTANT A TA VOLONTE</p>
      </section>
  </div>
  <section class="flex flex-col h-1/3">
    <div class="flex flex-col flex-1">
      <div class="input-button-container rounded-xl m-8 flex justify-between my-3 border">
        <input type="text" v-model="prompt" class="p-2 border rounded-bl-xl rounded-tl-xl text-sm w-3/4" placeholder="Saisissez votre prompt..." />
        <button class="rounded-tr-xl rounded-br-xl flex justify-center items-center" @click="generatePrompt">
          <NuxtImg v-if="!onLoading" src="icons/Random.svg" alt="random prompt" height="30" width="30" />
          <Icon v-else name="line-md:loading-loop" color="gray" size="1.5rem" />
        </button>
      </div>
      <span class="flex w-full justify-center">
        <small class="text-gray-500 text-sm mx-8 px-2">Exemple : Un fou qui se balade dans un hôpital psychiatrique abandonné...</small>
      </span>
    </div>
    <div class="flex flex-col items-center justify-center m-6 gap-2">
      <NuxtLink :to="{name : 'story-create-teaser'}"  class="w-2/3">
        <AppButton label="Lancer l'incantation" class="w-full" :disabled="!canGeneratePrompt" :class="canGeneratePrompt ? '' : 'bg-gray-700'" />
      </NuxtLink>
      <small class="text-gray-500 text-sm px-2 underline">
        <a href="#">Voir les conseils et les consignes pour la génération</a>
      </small>
    </div>
  </section>
</template>

<style scoped>
.feature-wrapper {
  box-shadow: inset 0 0 50px 50px #080000;
}

.title-wrapper {
  bottom: 0;
  right: 0;
}

.thumbnail, .feature-wrapper {
 border-radius: 30%;
}

.input-button-container input {
  border: none;
  flex-grow: 1;
  padding: 10px;
}

.input-button-container button {
  border: none;
  background-color: #121212;
  padding: 10px;
  cursor: pointer;
}
</style>