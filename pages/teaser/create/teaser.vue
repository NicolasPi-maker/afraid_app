<script setup lang="ts">
import IconArrowLeft from "~/components/icons/IconArrowLeft.vue";
import IconShare from "~/components/icons/IconShare.vue";
import IconRegister from "~/components/icons/IconRegister.vue";
import AppButton from "~/components/shared/AppButton.vue";
import {useSpeech} from "~/composables/useSpeech";
import IconCheck from "~/components/icons/IconCheck.vue";

const router = useRouter();
const prompt = useState('prompt', () => {
  return '';
});

const newStoryId = ref(0);
const state = reactive({
  teaser : {
    title: '',
    content: '',
    illustration: {
      url: '',
      description: '',
    }
  },
  speaker : {
    id: 46,
    api_id: 'OVVPnTGPGhk7vn3RUB1h'
  },
  language: {
    id: 74,
    code: 'FR',
  }
});

const isLoading = ref(false);
const isOpen = ref(false);
const storyGenerationLaunched = ref(false);

const launchStoryGeneration = () => {
  isLoading.value = true;
  isOpen.value = true;
  storyGenerationLaunched.value = true;
}

const { generateTeaser, saveTeaser } = useTeaser();
const { generateStory, storeChapters} = useStory();
const { saveSpeech } = useSpeech();

const { data, pending, error, refresh } = await generateTeaser(prompt.value);
state.teaser = data.value.teaser;

const storyGenerationCheckPoint = ref({
  storyGeneration : false,
  chaptersGeneration : false,
  speechGeneration : false,
});
const confirmTeaser = async () => {
  const data = {
    prompt: prompt.value,
    teaser: state.teaser,
    speaker: state.speaker,
    language: state.language,
  };
  if(!isLoading.value) {
    try {
      launchStoryGeneration();
      const response = await generateStory(data);
      if(response.success) {
        storyGenerationCheckPoint.value.storyGeneration = true;
        const { prompt_id, teaser, story_id, generated_story } = response.data;
        newStoryId.value = story_id;
        saveTeaser({prompt_id, story_id, teaser});
        const {data: chapterResponse } = await storeChapters(generated_story, story_id);
        if(chapterResponse.value.success) {
          storyGenerationCheckPoint.value.chaptersGeneration = true;
        }

        const {data: speechResponse} = await saveSpeech({story_id, speaker: data.speaker, language: data.language});
        if(speechResponse.value.success) {
          storyGenerationCheckPoint.value.speechGeneration = true;
        }

      }
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }
}

const storyIsReady = computed(() => {
  return storyGenerationCheckPoint.value.storyGeneration && storyGenerationCheckPoint.value.chaptersGeneration && storyGenerationCheckPoint.value.speechGeneration;
});
</script>

<template>
  <div class="h-full flex flex-col">
    <section class="relative thumbnail-wrapper opacity-80">
      <NuxtImg :src="state.teaser.illustration.url" :alt="state.teaser.illustration.description" class="w-full" />
      <div class="header-teaser-wrapper flex flex-col absolute top-0 w-full p-2">
        <button @click="router.back()">
          <IconArrowLeft class="flex-1 mt-2 mx-5"/>
        </button>
        <div class="flex justify-between items-center mt-2 mx-3">
          <h1 class="font-marina text-xl w-1/2">{{ (state.teaser.title).toUpperCase() }}</h1>
          <ul class="flex gap-4">
            <li>
              <IconShare width="30" height="30" />
            </li>
            <li>
              <IconRegister width="30" height="30" />
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="text-wrapper flex flex-1">
      <div class="flex flex-col gap-3 mx-5 p-2">
        <h2 class="font-marina text-lg">RÉSUMÉ</h2>
        <p class="font-respira text-gray-400">{{ state.teaser.content }}</p>
      </div>
    </section>
    <section class="flex justify-center items-center gap-6 m-6 mb-12">
      <NuxtLink :to="{name : 'teaser-create'}" class="w-1/2">
        <AppButton label="Retour" outlined class="w-full"/>
      </NuxtLink>
      <AppButton v-if="!storyGenerationLaunched" :loading="isLoading" label="Valider le résumé" @click="confirmTeaser" class="w-1/2"/>
    </section>
    <UModal v-model="isOpen" prevent-close :ui="{container: 'items-center'}">
      <div class="p-6 flex flex-col items-center justify-center gap-6">
        <h2 v-if="!storyIsReady" class="text-lg font-marina text-center">Votre histoire est en cours de génération, veuillez patienter...</h2>
        <h2 v-else class="text-lg font-marina text-center">Votre histoire est terminée, bonne chance...</h2>
        <ol class="w-full flex flex-col gap-3">
          <li>
            <div v-if="!storyGenerationCheckPoint.storyGeneration" class="flex gap-3">
              <p class="flex-1 text-base font-respira">L'écriture est en cours</p>
              <Icon name="line-md:loading-loop" />
            </div>
            <div v-else class="flex gap-3">
              <p class="flex-1 text-base font-respira">Ecriture terminée</p>
              <IconCheck width="30" height="30" />
            </div>
          </li>
          <li>
            <div v-if="!storyGenerationCheckPoint.chaptersGeneration" class="flex gap-3">
              <p class="flex-1 text-base font-respira">Illustration des chapitres en cours</p>
              <Icon name="line-md:loading-loop" />
            </div>
            <div v-else class="flex gap-3">
              <p class="flex-1 text-base font-respira">Illustration de l'histoire terminée</p>
              <IconCheck width="30" height="30" />
            </div>
          </li>
          <li>
            <div v-if="!storyGenerationCheckPoint.speechGeneration" class="flex gap-3">
              <p class="flex-1 text-base font-respira">Génération de la voix en cours</p>
              <Icon name="line-md:loading-loop" />
            </div>
            <div v-else class="flex gap-3">
              <p class="flex-1 text-base font-respira">Génération de la voix terminée</p>
              <IconCheck width="30" height="30" />
            </div>
          </li>
        </ol>
        <NuxtLink v-if="storyIsReady" :to="{name: 'story-id', params: {id: newStoryId}}" class="w-2/3">
          <AppButton label="Lire mon histoire" class="mt-6 w-full"/>
        </NuxtLink>
      </div>
    </UModal>
  </div>
</template>

<style scoped>
.header-teaser-wrapper {
  background: rgb(0,0,0);
  background: linear-gradient(180deg, rgba(0,0,0,1) 41%, rgba(255,255,255,0) 100%);
}

.thumbnail-wrapper {
  -webkit-box-shadow: inset 0 0 50px 50px #000000;
  box-shadow: inset 0 0 50px 50px #000000;
}

.text-wrapper {
  box-shadow: -3px -22px 50px 47px #000000;
}
</style>