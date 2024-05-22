<script setup lang="ts">
import {onMounted} from "vue";
import IconRegister from "~/components/icons/IconRegister.vue";
import IconArrowLeft from "~/components/icons/IconArrowLeft.vue";
import IconShare from "~/components/icons/IconShare.vue";
import AppButton from "~/components/shared/AppButton.vue";

const { getStory } = useStory();
const state = reactive({
  story: null,
  loading: true,
});

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  try {
    const response = await getStory(route.params.id);
    state.story = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    state.loading = false;
  }
});

const storyLanguage = ref('FR');
</script>

<template>
  <div v-if="state.loading">
    <p>Chargement</p>
  </div>
  <div v-else class="h-full flex flex-col">
    <section class="relative thumbnail-wrapper opacity-80">
      <NuxtImg :src="state.story.teasers[0].thumbnails[0].url" :alt="state.story.teasers[0].thumbnails[0].alt" class="w-full" />
      <div class="flex flex-col absolute top-0 w-full p-2">
        <button @click="router.back()">
          <IconArrowLeft class="flex-1 mt-2 mx-3"/>
        </button>
      </div>
      <div class="flex justify-between items-center absolute bottom-0 p-2">
        <h1 class="font-marina text-xl w-full mx-3">{{ (state.story.title).toUpperCase() }}</h1>
      </div>
    </section>
    <section class="flex flex-col m-3 p-2">
      <div class="flex items-center">
        <div class="flex items-center gap-2 flex-1">
          <p class="text-lg font-respira">4.0</p>
          <NuxtImg src="icons/star.svg" alt="star" width="20px" height="20px" />
        </div>
        <ul class="flex gap-4">
          <li>
            <IconShare width="30" height="30" />
          </li>
          <li>
            <IconRegister width="30" height="30" />
          </li>
          <li>
            <USelect
                size="md"
                v-model="storyLanguage"
                :options="state.story.languages"
                :placeholder="storyLanguage"
                option-attribute="code"
                value-attribute="code"
            >
            </USelect>
          </li>
        </ul>
      </div>
      <p class="text-sm font-respira">13 mins</p>
      <p class="text-sm font-respira">875 Ecoutes</p>
    </section>
    <section class="mx-3 p-2 flex flex-col flex-1">
      <p class="text-gray-500 font-respira flex flex-1">{{ state.story.teasers[0].content }}</p>
      <div class="flex justify-center w-full">
        <AppButton label="Voir l'histoire" iconPath="icons/play.svg" class="w-full m-3" @click="router.push({name: 'story-details-id', params: {id: state.story.id}})" />
      </div>
    </section>
  </div>
</template>

<style scoped>
</style>